import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
} from '@chakra-ui/react';

import styles from './topicForm.module.css';
import { useQueryClient } from '@tanstack/react-query';

export const TopicForm = () => {
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
          <FormLabel htmlFor="name" m={'0'} p={'5'} fontSize={'xl'}>
            Topic Title
          </FormLabel>
          <Input
            w={'min'}
            id="name"
            placeholder="name"
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
          Submit
        </Button>
      </form>
    </Box>
  );
};
