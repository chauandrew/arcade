import UserService from '@/services/userService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const email = req.body?.email;
  const username = req.body?.username;
  const password = req.body?.password;

  const userExists = await UserService.doesUserExist(email, username);
  if (userExists) {
    res.status(400).json('User already exists');
  } else {
    // create user

    await UserService.createUser(email, username, password);
    res.status(200).json('Created!');
  }
}
