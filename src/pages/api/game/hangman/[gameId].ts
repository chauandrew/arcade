import type { NextApiRequest, NextApiResponse } from 'next';
import HangmanService from '@/services/HangmanService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const gameId: string = req.query.gameId as string;
  const letter: string = req.body.letter;
  if (req.method === 'POST') {
    try {
      const response = await HangmanService.makeGuess(gameId, letter);
      res.status(200).json(response);
    } catch (e) {
      console.error(e);
      res.status(500).json(e);
    }
  } else {
    res.status(404);
  }
}
