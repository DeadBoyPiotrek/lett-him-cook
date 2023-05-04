import { Link } from '@chakra-ui/next-js';
import { Box, Button, Heading } from '@chakra-ui/react';
import type { Topic } from '@prisma/client';
import { dateToLongFormat } from 'utils/date/dateToLongFormat';
import { titleToSlug } from 'utils/strings/titleToSlug';

const deleteTopic = async (id: number) => {
  console.log('delete topic with id', id);
  await fetch('/api/deleteTopic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
};

export const TopicBox = ({ topic }: { topic: Topic }) => {
  return (
    <Box bg="red.400" borderRadius="10px" border="1px solid black" p={5}>
      <Link _hover={{ textDecoration: 'none' }} href={`/topic/${topic.slug}`}>
        <p>{dateToLongFormat(topic.createdAt)}</p>
        <Heading>{topic.title}</Heading>
      </Link>
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
