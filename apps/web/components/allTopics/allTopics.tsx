import { Flex } from '@chakra-ui/react';
import type { Topic } from '@prisma/client';
import { TopicBox } from 'components/topicBox/topicBox';

export const AllTopics = ({ topics }: { topics: Topic[] }) => {
  return (
    <Flex p={20} gap={5} flexWrap={'wrap'}>
      {topics.map(topic => (
        <TopicBox key={topic.id} topic={topic} />
      ))}
    </Flex>
  );
};
