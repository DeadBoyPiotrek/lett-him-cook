import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

export const TopicForm = () => {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

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
    refreshData();
  });

  return (
    <Box w={'auto'}>
      <form
        style={{ alignItems: 'center', display: 'flex' }}
        onSubmit={onSubmit}
      >
        <FormControl
          display={'flex'}
          alignItems={'center'}
          isInvalid={!!errors.name}
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
