import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '../../../server/db/client';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.body.id;
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = session.user;

  if (!user || typeof user.email !== 'string') {
    return res.status(400).json({ message: 'Invalid session data' });
  }

  try {
    const question = await prisma.question.delete({
      where: {
        id,
      },
    });
    return res.status(200).json(question);
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Something went wrong',
      },
    });
  }
};

export default handler;
