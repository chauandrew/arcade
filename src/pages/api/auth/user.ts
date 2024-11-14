import UserService from '@/services/UserService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const email = req.body?.email;
    const username = req.body?.username;
    const password = req.body?.password;

    try {
      await UserService.createUser(email, username, password);
      res.status(200).json('Created!');
    } catch (e) {
      if (e instanceof Error) {
        res.status(400).json({ error: e.message });
      } else {
        res.status(400).json({ error: 'Bad Request' });
      }
    }
  }
}
