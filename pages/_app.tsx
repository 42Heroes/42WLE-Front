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
import Auth from '../components/common/Auth';
import SocketProvider from '../components/common/SocketEventProvider';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks');
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <Auth>
            <SocketProvider>
              <ThemeProvider theme={darkTheme}>
                <GlobalStyle />
                {getLayout(<Component {...pageProps} />)}
                <ReactQueryDevtools initialIsOpen={false} />
              </ThemeProvider>
            </SocketProvider>
          </Auth>
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
