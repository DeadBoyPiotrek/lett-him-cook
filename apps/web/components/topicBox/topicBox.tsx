import { Box, Heading } from '@chakra-ui/react';
import type { Topic } from '@prisma/client';
import { dateToLongFormat } from 'utils/date/dateToLongFormat';

export const TopicBox = ({ topic }: { topic: Topic }) => {
  console.log(topic);
  return (
    <Box bg="red.400" borderRadius="10px" border="1px solid black" p={5}>
      <Heading>{topic.title}</Heading>
      <p>{dateToLongFormat(topic.createdAt)}</p>
    </Box>
  );
};
