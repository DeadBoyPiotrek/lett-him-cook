import { Flex } from '@chakra-ui/react';

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      display="flex"
      alignItems={'center'}
      flexDirection="column"
      height="calc(100vh - 80px)"
    >
      {children}
    </Flex>
  );
};
