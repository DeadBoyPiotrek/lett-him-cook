import { Button, Flex, Heading } from '@chakra-ui/react';
import { prisma } from '@client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../web/pages/api/auth/[...nextauth]';
import type { GetServerSidePropsContext } from 'next';
import type { Topic } from '@prisma/client';
const addTextHandler = async () => {
  const response = await fetch('/api/text', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: 'Hello world',
    }),
  });

  const data = await response.json();
  console.log(data);
};

export default function Home({ topics }: { topics: Topic[] }) {
  return (
    <Flex>
      <Heading>Index Page</Heading>
      <Button onClick={addTextHandler}>Send text to database</Button>
      <ul>
        {topics.map(topic => (
          <li key={topic.id}>{topic.title}</li>
        ))}
      </ul>
    </Flex>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log(`🚀 ~ session:`, session);

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
