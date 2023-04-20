import { Button, Flex, Heading } from '@chakra-ui/react';

const addTextHandler = async () => {
  const response = await fetch('/api/text', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: 'Hello world',
    }),
  });

  const data = await response.json();
  console.log(data);
};

export default function Home() {
  return (
    <Flex>
      <Heading>Index Page</Heading>

      <Button onClick={addTextHandler}>Send text to database</Button>
    </Flex>
  );
}
