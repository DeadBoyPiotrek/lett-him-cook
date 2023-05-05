import { Flex } from '@chakra-ui/react';
import { QuestionBox } from './questionBox';
type Question = {
  id: number;
  text: string;
  createdAt: Date;
};
export const Questions = ({ questions }: { questions: Question[] }) => {
  return (
    <Flex p={20} flexDirection={'column'} gap={5} flexWrap={'wrap'}>
      {questions.map(question => (
        <QuestionBox key={question.id} question={question} />
      ))}
    </Flex>
  );
};

export default Questions;
