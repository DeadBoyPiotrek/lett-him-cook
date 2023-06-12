import type { Topic } from '@prisma/client';
import { AllTopics } from '../components/allTopics/allTopics';
import { PageWrapper } from 'components/pageWrapper/pageWrapper';

import type { GetServerSideProps } from 'next';
import { TopicForm } from 'components/addTopic/topicForm';
import { getAllTopics } from './api/topic/getAllTopics';
import { useQuery } from '@tanstack/react-query';

export const getServerSideProps: GetServerSideProps = async context => {
  const topics = await getAllTopics(context.req, context.res);
  return {
    props: {
      topics,
    },
  };
};
export default function Home({ topics }: { topics: Topic[] }) {
  const { data = topics } = useQuery(['topics'], async () => {
    const response = await fetch('/api/topic/getAllTopics');
    return response.json();
  });

  return (
    <PageWrapper>
      <TopicForm />
      <AllTopics topics={data} />
    </PageWrapper>
  );
}
