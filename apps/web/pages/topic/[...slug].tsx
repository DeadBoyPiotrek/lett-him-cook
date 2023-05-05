import type { GetServerSideProps } from 'next';
import { prisma } from '@client';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { QuestionForm } from 'components/question/questionForm';
import Questions from 'components/question/questions';

type Topic = {
  id: number;
  title: string;
  createdAt: Date;
};

const Topic = ({ topic }: { topic: Topic }) => {
  console.log(topic);
  return (
    <div>
      <QuestionForm />

      <Questions questions={[]} />
    </div>
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
    },
    where: {
      user: {
        email: session?.user?.email,
      },
      slug,
    },
  });
  console.log(`🚀 ~ topic:`, topic);

  return {
    props: {
      topic: JSON.parse(JSON.stringify(topic)),
    },
  };
};

export default Topic;
