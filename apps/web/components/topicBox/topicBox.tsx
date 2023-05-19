import { Link } from '@chakra-ui/next-js';
import { Box, Button, Heading } from '@chakra-ui/react';
import type { Topic } from '@prisma/client';
import { dateToLongFormat } from 'utils/date/dateToLongFormat';
import { useQueryClient } from '@tanstack/react-query';

const deleteTopic = async (id: number) => {
  await fetch('/api/topic/deleteTopic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
};

export const TopicBox = ({ topic }: { topic: Topic }) => {
  const queryClient = useQueryClient();

  return (
    <Box bg="red.400" borderRadius="10px" p={5}>
      <Link _hover={{ textDecoration: 'none' }} href={`/topic/${topic.slug}`}>
        <p>{dateToLongFormat(topic.createdAt)}</p>
        <Heading>{topic.title}</Heading>
      </Link>
      <Button
        onClick={async () => {
          await deleteTopic(topic.id);
          queryClient.invalidateQueries();
        }}
      >
        💀
      </Button>
    </Box>
  );
};
