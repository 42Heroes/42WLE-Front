import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import Router from 'next/router';
export default async function gg(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  const { data } = await axios.get(
    `http://192.168.1.67:8080/auth/social/42?code=${code}`,
  );
  console.log(data);
  /* set cookie and axios-header */
  res.writeHead(301, { Location: '/find' }).end();
  //   Router.push(`http://localhost:3000/find`);
}

// function callback(accessToken: string, refreshToken: string) {
//   const router = useRouter();
//   const { code } = router.query;
//   axios.defaults.headers.common['access-token'] = code;

//   cookie.save('accessToken', accessToken, {
//     path: '/',
//   });
//   cookie.save('refreshToken', refreshToken, {
//     path: '/',
//   });
// }
