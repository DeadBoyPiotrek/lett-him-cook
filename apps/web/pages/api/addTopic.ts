import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { prisma } from '../../server/db/client';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  console.log('session', session);
  console.log('req.body', req.body);
  const { name } = req.body;
  console.log(`🚀 ~ handler ~ name:`, name);
  const topic = await prisma.topic.create({
    data: {
      title: name,
      user: {
        connect: {
          email: session?.user?.email,
        },
      },
    },
  });

  return res.status(200).json(topic);
};

export default handler;
