import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { Prisma } from '@prisma/client';
import { prisma } from '../../server/db/client';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('hello');
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = req.body;

    const topic = await prisma.topic.delete({
      where: {
        id,
      },
    });

    return res.status(200).json(topic);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ message: 'Bad request' });
    } else {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export default handler;
