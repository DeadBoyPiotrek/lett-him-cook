import { prisma } from '@client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../web/pages/api/auth/[...nextauth]';
import type { Topic } from '@prisma/client';
import { AllTopics } from '../components/allTopics/allTopics';
import { PageWrapper } from 'components/pageWrapper/pageWrapper';

import type { GetServerSideProps } from 'next';
import { TopicForm } from 'components/addTopic/topicForm';
import { getAllTopics } from './api/topic/getAllTopics';
import { useQuery } from '@chakra-ui/react';

export default function Home({ topics }: { topics: Topic[] }) {
  return (
    <PageWrapper>
      <TopicForm />
      <AllTopics topics={topics} />
    </PageWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const topics = await getAllTopics(context);
  return {
    props: {
      topics,
    },
  };
};
