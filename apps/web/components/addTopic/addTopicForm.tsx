import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react';

export const AddTopicForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = handleSubmit(async data => {
    console.log(data);
    reset();
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
          {/* XDDDDDDDDDDDDDDDDDDDDD i love typescript ❤️❤️❤️❤️*/}
          {/* TODO - fix this error message */}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
};
