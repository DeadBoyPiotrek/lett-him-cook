import type { GetServerSideProps } from 'next';
import { prisma } from '@client';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { QuestionForm } from 'components/question/questionForm';
import { QuestionsAnswers } from 'components/questionAnswer/questionsAnswers';
import { PageWrapper } from 'components/pageWrapper/pageWrapper';
import { Heading } from '@chakra-ui/react';

type Topic = {
  id: number;
  title: string;
  createdAt: Date;
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

const Topic = ({ topic }: { topic: Topic }) => {
  return (
    <PageWrapper>
      <Heading m={10}>{topic.title}</Heading>
      <QuestionForm id={topic.id} />
      <QuestionsAnswers questions={topic.questions} />
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const slug = context.query.slug?.[0];

  if (!slug || !session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const topic = await prisma.topic.findFirst({
    select: {
      id: true,
      title: true,
      createdAt: true,
      questions: {
        select: {
          id: true,
          text: true,
          createdAt: true,
          answer: {
            select: {
              id: true,
              text: true,
              createdAt: true,
            },
          },
        },
      },
    },
    where: {
      user: {
        email: session?.user?.email,
      },
      slug,
    },
  });

  return {
    props: {
      topic: JSON.parse(JSON.stringify(topic)),
    },
  };
};

export default Topic;
