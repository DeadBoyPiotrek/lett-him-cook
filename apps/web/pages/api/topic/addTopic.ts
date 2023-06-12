import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '../../../server/db/client';
import { titleToSlug } from 'utils/strings/titleToSlug';
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  const { name } = req.body;

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = session.user;

  if (!user || typeof user.email !== 'string') {
    return res.status(400).json({ message: 'Invalid session data' });
  }

  const topic = await prisma.topic.create({
    data: {
      title: name,
      slug: titleToSlug(name),
      user: {
        connect: {
          email: user.email,
        },
      },
    },
  });

  return res.status(200).json(topic);
};
