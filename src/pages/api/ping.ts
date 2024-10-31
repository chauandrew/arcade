import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const client = await clientPromise;
  const db = client.db('arcade-dev');

  switch (req.method) {
    case 'GET':
      const users = await db.collection('color').find({}).toArray();
      res.status(200).json(users);
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end('BLAH');
  }
}
