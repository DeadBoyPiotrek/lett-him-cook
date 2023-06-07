import { prisma } from '@client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export const getSingleTopic = async (
  req: NextApiRequest,

  res: NextApiResponse
) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) return [];

  const slug = req.body;

  const topic = await prisma.topic.findFirst({
    select: {
      id: true,
      title: true,
      createdAt: true,
      questions: {
        select: {
          id: true,
          text: true,
          createdAt: true,
          answer: {
            select: {
              id: true,
              text: true,
              createdAt: true,
            },
          },
        },
      },
    },
    where: {
      user: {
        email: session?.user?.email,
      },
      slug,
    },
  });
  return JSON.parse(JSON.stringify(topic));
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const topic2 = await getSingleTopic(req, res);

  return res.status(200).json(topic2);
};
