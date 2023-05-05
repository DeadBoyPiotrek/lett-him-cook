import { Flex } from '@chakra-ui/react';
import { QuestionBox } from './questionBox';

export const Questions = ({ questions }: { questions: Question[] }) => {
  return (
    <Flex p={20} gap={5} flexWrap={'wrap'}>
      {questions.map(question => (
        <QuestionBox key={question.id} question={question} />
      ))}
    </Flex>
  );
};

export default Questions;
