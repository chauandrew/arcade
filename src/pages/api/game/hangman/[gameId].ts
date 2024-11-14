import type { NextApiRequest, NextApiResponse } from 'next';
import HangmanService from '@/services/HangmanService';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const gameId: string = req.query.gameId as string;
  const letter: string = req.body.letter;
  if (req.method === 'POST') {
    try {
      const gameObjectId = new ObjectId(gameId);
      const response = await HangmanService.makeGuess(gameObjectId, letter);
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
