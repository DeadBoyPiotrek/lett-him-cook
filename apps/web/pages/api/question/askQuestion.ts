import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '../../../server/db/client';

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }

  const { question: text, topicId } = req.body;

  if (text.trim().length === 0) {
    res.status(400).json({
      error: {
        message: 'Please enter a valid animal',
      },
    });
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = session.user;

  if (!user || typeof user.email !== 'string') {
    return res.status(400).json({ message: 'Invalid session data' });
  }

  const topicData = await prisma.topic.findFirst({
    where: {
      id: topicId,
    },
    select: {
      title: true,
      questions: {
        select: { text: true, answer: { select: { text: true } } },
      },
    },
  });
  console.log(`🚀 ~ handler ~ topicData:`, topicData);

  type Role = 'user' | 'assistant';

  const conversation =
    topicData?.questions
      .map((question): { role: Role; content: string }[] => {
        const assistantContent = question.answer?.text || '';

        return [
          { role: 'user', content: question.text },
          { role: 'assistant', content: assistantContent },
        ];
      })
      .flat() ?? [];
  // wait for 5 seconds here

  const assistantPersonality = `You are a coach who helps me with ${topicData?.title}`;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'assistant', content: assistantPersonality },
        ...conversation,
        { role: 'user', content: text },
      ],
      temperature: 0.6,
      max_tokens: 2048,
    });

    const answer = completion.data.choices[0].message?.content;

    const question = await prisma.question.create({
      data: {
        text,
        topic: {
          connect: {
            id: topicId,
          },
        },
        answer: {
          create: {
            text: answer,
          },
        },
      },
    });

    return res.status(200).json(question);
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      });
    }
  }
};

export default handler;
