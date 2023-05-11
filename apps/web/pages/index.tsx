import { prisma } from '@client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../web/pages/api/auth/[...nextauth]';
import type { Topic } from '@prisma/client';
import { AllTopics } from '../components/allTopics/allTopics';
import { PageWrapper } from 'components/pageWrapper/pageWrapper';

import type { GetServerSideProps } from 'next';
import { TopicForm } from 'components/addTopic/topicForm';

export default function Home({ topics }: { topics: Topic[] }) {
  return (
    <PageWrapper>
      <TopicForm />
      <AllTopics topics={topics} />
    </PageWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session?.user?.email) {
    return {
      props: {
        topics: [],
      },
    };
  }

  const topics = await prisma.topic.findMany({
    where: {
      user: {
        email: session?.user?.email,
      },
    },
  });

  return {
    props: {
      topics: JSON.parse(JSON.stringify(topics)),
    },
  };
};
