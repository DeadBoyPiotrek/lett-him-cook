import type { GetServerSideProps } from 'next';
import { prisma } from '@client';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { QuestionForm } from 'components/question/questionForm';
const Topic = ({ topic }) => {
  console.log(topic);
  return (
    <div>
      <QuestionForm />

      <p>TOpic: {topic.title}</p>
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
