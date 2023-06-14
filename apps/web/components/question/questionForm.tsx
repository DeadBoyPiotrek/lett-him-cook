import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Flex,
} from '@chakra-ui/react';
import styles from '../addTopic/topicForm.module.css';
import { useQueryClient } from '@tanstack/react-query';
import { en } from 'locales/en';
import { pl } from 'locales/pl';
import { useRouter } from 'next/router';

export const QuestionForm = ({ id }: { id: number }) => {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === 'en' ? en : pl;

  const queryClient = useQueryClient();
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
    queryClient.invalidateQueries();
    reset();
  });

  return (
    <Box w={['100%', '100%', '100%', '4xl']} pb={'14'}>
      <form className={styles.form} onSubmit={onSubmit}>
        <FormControl
          display={'flex'}
          alignItems={'center'}
          isInvalid={!!errors.question}
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <Flex flex="1">
            <Input
              w={'100%'}
              id="question"
              placeholder={translation.askQuestionPlaceholder}
              {...register('question', {
                required: 'This is required',
                minLength: { value: 4, message: 'Minimum length should be 4' },
              })}
            />
          </Flex>
          <FormErrorMessage position={'absolute'} left={'36'} top={'14'}>
            {errors.question && errors.question.message?.toString()}
          </FormErrorMessage>
        </FormControl>
        <Button
          ml={'5'}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          {translation.submit}
        </Button>
      </form>
    </Box>
  );
};
