import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import { Navigation } from 'ui/Navigation/navigation';
import theme from 'utils/chakra/theme';
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    //TODO: add providers component
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Navigation />
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}
