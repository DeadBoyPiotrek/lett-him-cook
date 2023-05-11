import { Box, Button } from '@chakra-ui/react';
type Question = {
  id: number;
  text: string;
  createdAt: Date;
};

const deleteQuestion = async (id: number) => {
  await fetch('/api/question/deleteQuestion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
};

export const QuestionBox = ({ question }: { question: Question }) => {
  return (
    <Box textAlign={'center'}>
      {question.text}

      <Button onClick={() => deleteQuestion(question.id)}>Delete 💀</Button>
    </Box>
  );
};
