import { Db } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import * as dotenv from 'dotenv';
import { Color } from '@/dto/Color';
dotenv.config();

const collectionName: string = 'color';

const getAllColors: () => Promise<Color[]> = async () => {
  const db: Db = await clientPromise;
  const collection = db.collection<Color>(collectionName);
  const allColors: Color[] = await collection.find({}).toArray();
  return allColors;
};

const ColorService = {
  getAllColors,
};

export default ColorService;
