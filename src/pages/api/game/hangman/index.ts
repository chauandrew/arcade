import type { NextApiRequest, NextApiResponse } from 'next';
import HangmanService from '@/services/HangmanService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const created = await HangmanService.createHangmanGame();
      res.status(200).json(created);
    } catch (e) {
      console.error(e);
      res.status(500);
    }
  } else {
    res.status(404);
  }
}
