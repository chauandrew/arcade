import Game from '@/dto/Game';
import GameService from '@/services/GameService';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const allGames: Game[] = await GameService.getAllGames();
      res.status(200).json(allGames);
    } catch (e) {
      console.error(e);
      res.status(500);
    }
  } else {
    res.status(404);
  }
}
