import type { NextApiRequest, NextApiResponse } from 'next';
import GameService from '@/services/GameService';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const gameId: string = req.query.gameId as string;
  if (req.method === 'GET') {
    try {
      const response = await GameService.getGameById(new ObjectId(gameId));
      res.status(200).json(response);
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).json(e.message);
      } else {
        res.status(500);
      }
    }
  } else {
    res.status(404);
  }
}
