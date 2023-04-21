import { Link } from '@chakra-ui/next-js';
import { Button, Flex } from '@chakra-ui/react';
export const Navigation = () => {
  return (
    <Flex padding={5} justify={'center'} gap={5}>
      <Button p={0}>
        <Link _hover={{ textDecoration: 'none' }} p={4} href={'/'}>
          Main Page
        </Link>
      </Button>
      <Button p={0}>
        <Link _hover={{ textDecoration: 'none' }} p={4} href={'/userProfile'}>
          User Profile
        </Link>
      </Button>
    </Flex>
  );
};
