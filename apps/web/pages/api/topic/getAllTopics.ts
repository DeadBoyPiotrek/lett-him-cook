import { prisma } from '@client';
import type { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export const getAllTopics = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions);

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
