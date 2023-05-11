import { Flex } from '@chakra-ui/react';
import { QuestionAnswerBox } from './questionAnswearBox';
type Question = {
  id: number;
  text: string;
  createdAt: Date;
  answer: {
    id: number;
    text: string;
    createdAt: Date;
  };
};
export const QuestionsAnswers = ({ questions }: { questions: Question[] }) => {
  return (
    <Flex p={20} flexDirection={'column'} gap={5} flexWrap={'wrap'}>
      {questions.map(question => (
        <QuestionAnswerBox key={question.id} question={question} />
      ))}
    </Flex>
  );
};
