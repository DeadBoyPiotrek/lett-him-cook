import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
} from '@chakra-ui/react';
export const QuestionForm = ({ id }: { id: number }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = handleSubmit(async data => {
    data.topicId = id;

    await fetch('/api/question/askQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    reset();
  });

  return (
    <Box w={'auto'}>
      <form
        style={{ display: 'flex', alignItems: 'center' }}
        onSubmit={onSubmit}
      >
        <FormControl
          display={'flex'}
          alignItems={'center'}
          isInvalid={!!errors.question}
        >
          <FormLabel m={'0'} p={'5'} htmlFor="question">
            Ask Question
          </FormLabel>
          <Input
            w={'min'}
            id="question"
            placeholder="question"
            {...register('question', {
              required: 'This is required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          <FormErrorMessage position={'absolute'} left={'36'} top={'14'}>
            {errors.question && errors.question.message?.toString()}
          </FormErrorMessage>
        </FormControl>
        <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};
