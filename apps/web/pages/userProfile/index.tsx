import type { GetServerSidePropsContext } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as <br /> {session?.user?.email} <br /> <br />
        <Button onClick={() => signOut()}>Sign out</Button> <br />
        <Button
          onClick={async () => {
            await fetch('api/account/deleteAccount');

            router.push('/');
          }}
        >
          DeleteAccount
        </Button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <Button onClick={() => signIn()}>Sign in</Button>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      session,
    },
  };
};
