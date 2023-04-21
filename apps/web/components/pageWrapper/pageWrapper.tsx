import { Box } from '@chakra-ui/react';

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      display="flex"
      alignContent={'center'}
      flexDirection="column"
      height="calc(100vh - 80px)"
    >
      {children}
    </Box>
  );
};
