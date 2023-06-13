import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '../../../server/db/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await prisma.user.delete({
      where: {
        email: session?.user?.email,
      },
    });
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    console.log(`🚀 ~ error`, error);
    res.status(500).json({
      error: {
        message: 'Something went wrong while deleting the user',
      },
    });
  }
};
