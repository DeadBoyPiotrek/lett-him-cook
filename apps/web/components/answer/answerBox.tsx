import { Box, Text } from '@chakra-ui/react';

type Answer = {
  id: number;
  text: string;
  createdAt: Date;
};

export const AnswerBox = ({ answer }: { answer: Answer }) => {
  return (
    <Box maxW={1200} background={'blackAlpha.500'} p={5} borderRadius={'md'}>
      <Text whiteSpace="pre-wrap">{answer?.text}</Text>
    </Box>
  );
};
