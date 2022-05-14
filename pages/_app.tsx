import '../styles/fonts.css';
import { NextPage } from 'next';
import { ReactElement, ReactNode, useState } from 'react';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from '../styles/theme';
import GlobalStyle from '../styles/global';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks');
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <ThemeProvider theme={darkTheme}>
            <GlobalStyle />
            {getLayout(<Component {...pageProps} />)}
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
}
export default MyApp;
