import { Box, Button } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
type Question = {
  id: number;
  text: string;
  createdAt: Date;
};

export const QuestionBox = ({ question }: { question: Question }) => {
  const queryClient = useQueryClient();
  const deleteQuestion = async (id: number) => {
    await fetch('/api/question/deleteQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    queryClient.invalidateQueries();
  };
  return (
    <Box textAlign={'center'}>
      {question.text}

      <Button onClick={() => deleteQuestion(question.id)}>Delete 💀</Button>
    </Box>
  );
};
