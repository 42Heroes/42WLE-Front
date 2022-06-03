import axios from 'axios';
// import { useCookies } from 'react-cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function Callback(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { code } = req.query;
  const { data } = await axios.get(
    `http://localhost:8080/auth/social/42?code=${code}`,
  );
  const token = data.accessToken;
  const cookieName = 'Set-Cookie';
  res.setHeader(`${cookieName}`, `token=${token}; path=/find;`);
  res.redirect('/find');
  res.json({ msg: 'good' });
  /* set cookie and axios-header */
}
