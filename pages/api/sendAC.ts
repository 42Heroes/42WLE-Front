import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default function Testerer(req: NextApiRequest, res: NextApiResponse) {
  console.log('This is in sendAC');
  async () => {
    await axios('http://localhost:3001/api/callback');
  };

  return res.redirect('/find');
}