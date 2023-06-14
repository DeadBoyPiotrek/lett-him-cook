import { Link } from '@chakra-ui/next-js';
import { Button, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { en } from 'locales/en';
import { pl } from 'locales/pl';
export const Navigation = () => {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === 'en' ? en : pl;
  return (
    <Flex padding={5} justify={'center'} gap={5}>
      <Button p={0}>
        <Link _hover={{ textDecoration: 'none' }} p={4} href={'/'}>
          {translation.mainPage}
        </Link>
      </Button>
      <Button p={0}>
        <Link _hover={{ textDecoration: 'none' }} p={4} href={'/userProfile'}>
          {translation.userProfile}
        </Link>
      </Button>
    </Flex>
  );
};
