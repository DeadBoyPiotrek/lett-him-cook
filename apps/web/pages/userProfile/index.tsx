import type { GetServerSidePropsContext } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { Button, Select } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { en } from 'locales/en';
import { pl } from 'locales/pl';

export default function Profile() {
  const router = useRouter();
  const changeLanguage = e => {
    const locale = e.target.value;
    router.push(router.pathname, router.asPath, { locale });
  };
  const { locale } = router;
  const translation = locale === 'en' ? en : pl;
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        {translation.signedAs}
        <br /> {session?.user?.email} <br /> <br />
        <Button onClick={() => signOut()}>{translation.signOut}</Button> <br />
        <Button
          onClick={async () => {
            await fetch('api/account/deleteAccount');

            router.push('/');
          }}
        >
          {translation.deleteAccount}
        </Button>
        <Select width={'20'} defaultValue={locale} onChange={changeLanguage}>
          <option value="en">EN</option>
          <option value="pl">PL</option>
        </Select>
      </>
    );
  }
  return (
    <>
      {translation.notSignedIn} <br />
      <Button onClick={() => signIn()}>{translation.signIn}</Button>
      <Select width={'20'} defaultValue={locale} onChange={changeLanguage}>
        <option value="en">EN</option>
        <option value="pl">PL</option>
      </Select>
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
