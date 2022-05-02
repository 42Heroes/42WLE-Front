import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/global';
import '../styles/fonts.css';
import { darkTheme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <ThemeProvider theme={darkTheme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
