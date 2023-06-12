import { prisma } from '@client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export const getAllTopics = async (
  req: NextApiRequest,

  res: NextApiResponse
) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) return [];

  const topics = await prisma.topic.findMany({
    where: {
      user: {
        email: session?.user?.email,
      },
    },
  });
  return JSON.parse(JSON.stringify(topics));
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const url = req.url;
  console.log(`🚀 ~ url:`, url);

  const topics2 = await getAllTopics(req, res);

  return res.status(200).json(topics2);
};
