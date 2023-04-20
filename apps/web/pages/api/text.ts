import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  console.log('body', body);
  const session = await getServerSession(req, res, authOptions);
  console.log('session', session);
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { text }: { text: string } = req.body;
  const topic = await prisma.topic.create({
    data: {
      title: text,
      user: {
        connect: {
          email: session?.user?.email,
        },
      },
    },
  });

  return res.status(200).json(topic);
}
