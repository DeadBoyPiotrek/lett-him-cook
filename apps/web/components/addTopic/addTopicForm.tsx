import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

export const AddTopicForm = () => {
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
    <form onSubmit={onSubmit}>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel htmlFor="name">Topic Title</FormLabel>
        <Input
          w={'min'}
          id="name"
          placeholder="name"
          {...register('name', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
};
