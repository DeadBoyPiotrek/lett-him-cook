import type { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { QuestionForm } from 'components/question/questionForm';
import { QuestionsAnswers } from 'components/questionAnswer/questionsAnswers';
import { PageWrapper } from 'components/pageWrapper/pageWrapper';
import { Heading } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import getSingleTopic from 'pages/api/topic/getSingleTopic';

type Topic = {
  id: number;
  title: string;
  createdAt: Date;
  questions: {
    id: number;
    text: string;
    createdAt: Date;
    answer: {
      id: number;
      text: string;
      createdAt: Date;
    };
  }[];
};

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const slug = context.query.slug;
  console.log(`🚀 ~ slug:`, slug);

  if (!slug || !session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const topic = await getSingleTopic(
    context.req as NextApiRequest,
    context.res as NextApiResponse
  );

  return {
    props: {
      topic,
    },
  };
};
const Topic = ({ topic }: { topic: Topic }) => {
  const { data = topic } = useQuery(['topic', topic.id], async () => {
    const response = await fetch(`/api/topic/getSingleTopic`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(topic.id),
    });
    console.log(`🚀 ~ response:`, response);
    return response.json();
  });

  return (
    <PageWrapper>
      <Heading m={10}>{data.title}</Heading>
      <QuestionForm id={data.id} />
      <QuestionsAnswers questions={data.questions} />
    </PageWrapper>
  );
};

export default Topic;
