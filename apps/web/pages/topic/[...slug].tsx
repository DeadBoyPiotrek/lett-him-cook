import type { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { QuestionForm } from 'components/question/questionForm';
import { QuestionsAnswers } from 'components/questionAnswer/questionsAnswers';
import { PageWrapper } from 'components/pageWrapper/pageWrapper';
import { Heading } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getSingleTopic } from 'pages/api/topic/getSingleTopic';

type Topic = {
  id: number;
  title: string;
  createdAt: Date;
  slug: string;
  questions: {
    id: number;
    text: string;
    createdAt: Date;
    answer: {
      id: number;
      text: string;
      createdAt: Date;
    };
  }[];
};

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const { slug } = context.query;
  const slugString = Array.isArray(slug) ? slug[0] : '';

  if (!slug || !session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const topic = await getSingleTopic(
    context.req as NextApiRequest,
    context.res as NextApiResponse,
    slugString
  );

  return {
    props: {
      topic,
    },
  };
};
const Topic = ({ topic }: { topic: Topic }) => {
  const { data = topic } = useQuery(['topic', topic.id], async () => {
    const response = await fetch('/api/topic/getSingleTopic', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ slug: topic.slug }),
    });

    return response.json();
  });

  return (
    <PageWrapper>
      <Heading m={10} color={'#ff0054'}>
        {data.title}
      </Heading>
      <QuestionsAnswers questions={data.questions} />
      <QuestionForm id={data.id} />
    </PageWrapper>
  );
};

export default Topic;
