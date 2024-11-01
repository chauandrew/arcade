import type { NextApiRequest, NextApiResponse } from 'next';
import ColorService from '@/services/colorService';
import { Color } from '@/dto/Color';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const allColors: Color[] = await ColorService.getAllColors();
    res.status(200).json(allColors);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
}
