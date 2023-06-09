// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

// 3. extend the theme
export const customTheme = extendTheme({
  config,
  // styles: { global: { body: { bg: 'gray.900', color: 'white' } } },
});
