import { Flex } from '@chakra-ui/react';
import { AnswerBox } from 'components/answer/answerBox';
import { QuestionBox } from 'components/question/questionBox';

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

export const QuestionAnswerBox = ({ question }: { question: Question }) => {
  return (
    <Flex p={'5'} direction={'column'} gap={'5'}>
      <QuestionBox key={question.id} question={question} />
      <AnswerBox key={question?.answer?.id} answer={question.answer} />
    </Flex>
  );
};
