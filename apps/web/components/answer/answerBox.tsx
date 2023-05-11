import { Box } from '@chakra-ui/react';

type Answer = {
  id: number;
  text: string;
  createdAt: Date;
};

export const AnswerBox = ({ answer }: { answer: Answer }) => {
  return (
    <Box background={'blackAlpha.500'} p={5} borderRadius={'md'}>
      {answer?.text}
    </Box>
  );
};
