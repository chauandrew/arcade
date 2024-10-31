import type { NextApiRequest, NextApiResponse } from 'next';
import { Db } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import * as dotenv from 'dotenv';
import { color } from '@/dto/color';
dotenv.config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const collectionName: string = 'color';
  try {
    const db: Db = await clientPromise;
    const collection = db.collection<color>(collectionName);
    const allColors: color[] = await collection.find({}).toArray();
    res.status(200).json(allColors);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
}
