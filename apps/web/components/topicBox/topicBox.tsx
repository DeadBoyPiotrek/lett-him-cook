import { Box, Button, Heading } from '@chakra-ui/react';
import type { Topic } from '@prisma/client';
import { dateToLongFormat } from 'utils/date/dateToLongFormat';

const deleteTopic = (id: number) => {
  fetch('/api/deleteTopic', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ id }),
  });
};

export const TopicBox = ({ topic }: { topic: Topic }) => {
  return (
    <Box bg="red.400" borderRadius="10px" border="1px solid black" p={5}>
      <Heading>{topic.title}</Heading>
      <p>{dateToLongFormat(topic.createdAt)}</p>
      <Button
        onClick={() => {
          deleteTopic(topic.id);
        }}
      >
        💀
      </Button>
    </Box>
  );
};
