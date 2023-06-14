import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
} from '@chakra-ui/react';
import { en } from 'locales/en';
import { pl } from 'locales/pl';
import { useRouter } from 'next/router';
import styles from './topicForm.module.css';
import { useQueryClient } from '@tanstack/react-query';

export const TopicForm = () => {
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
    await fetch('/api/topic/addTopic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    reset();
    queryClient.invalidateQueries();
  });

  return (
    <Box w={'auto'}>
      <form className={styles.form} onSubmit={onSubmit}>
        <FormControl
          display={'flex'}
          alignItems={'center'}
          isInvalid={!!errors.name}
          flexDirection={{ base: 'column', md: 'row' }}
          mb={{ base: '5', md: '0' }}
        >
          <Input
            w={'min'}
            id="name"
            placeholder={translation.submitTopicPlaceholder}
            {...register('name', {
              required: 'This is required',
              pattern: {
                value: /^[a-zA-Z0-9 ]*$/,
                message: 'Only letters and numbers are allowed',
              },
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          <FormErrorMessage position={'absolute'} left={'36'} top={'14'}>
            {errors.name && errors.name.message?.toString()}
          </FormErrorMessage>
        </FormControl>
        <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
          {translation.submit}
        </Button>
      </form>
    </Box>
  );
};
