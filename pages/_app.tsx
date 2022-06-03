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
// import axios from 'axios';
// import cookies from 'next-cookies';
// import Router from 'next/router';

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
          <Auth>
            <ThemeProvider theme={darkTheme}>
              <GlobalStyle />
              {getLayout(<Component {...pageProps} />)}
              <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
          </Auth>
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
}
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const appProps = MyApp.getInitialProps(appContext); //????뭐하는걸까
//   const { ctx } = appContext;
//   const { token } = cookies(ctx);
//   if (!token || token === '') {
//     if (ctx.req && ctx.res) {
//       ctx.res.writeHead(302, { Location: '/login' });
//       ctx.res.end();
//     } else {
//       Router.push('/login');
//     }
//   }
// const cookie = ctx.req ? ctx.req.headers.cookie : null;
// if (cookie) {
//   // 서버 환경일 때만 쿠키를 심어줌. 클라이언트 환경일 때는 브라우저가 자동으로 쿠키를 넣어줌
//   axios.defaults.headers.cookie = cookie;
//   // defaluts: 모든 axios 요청 시에 쿠키 데이터를 심어줌.
// }
// if (!state.user.me) {
//   // 유저 정보 요청
//   ctx.store.dispatch({
//     type: LOAD_USER_REQUEST,
//   });
// }
// if (Component.getInitialProps) {
//   pageProps = await Component.getInitialProps(ctx);
// }

//   return { pageProps };
// };

export default MyApp;
