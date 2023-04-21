import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import { Navigation } from '../components/navigation/navigation';
import { customTheme } from 'utils/chakra/theme';
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    //TODO: add providers component
    <SessionProvider session={session}>
      <ChakraProvider theme={customTheme}>
        <Navigation />
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}
