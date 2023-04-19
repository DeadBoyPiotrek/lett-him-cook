import { Link } from '@chakra-ui/next-js';
import { Flex } from '@chakra-ui/react';
export const Navigation = () => {
  return (
    <Flex padding={'5'} justify={'center'} bg={'pink'} gap={'5'}>
      <Link href={'/'}>Main Page</Link>
      <Link href={'/userProfile'}>User Profile</Link>
    </Flex>
  );
};
