import { Db } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import * as dotenv from 'dotenv';
import { color } from '@/dto/color';
dotenv.config();

const collectionName: string = 'color';

const getAllColors: () => Promise<color[]> = async () => {
  const db: Db = await clientPromise;
  const collection = db.collection<color>(collectionName);
  const allColors: color[] = await collection.find({}).toArray();
  return allColors;
};

const ColorService = {
  getAllColors,
};

export default ColorService;
