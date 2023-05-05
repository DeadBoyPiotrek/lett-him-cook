import { Box } from '@chakra-ui/react';
type Question = {
  id: number;
  text: string;
  createdAt: Date;
};
export const QuestionBox = ({ question }: { question: Question }) => {
  return (
    <Box background={'blackAlpha.500'} p={5} borderRadius={'md'}>
      {question.text}
    </Box>
  );
};
