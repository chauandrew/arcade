import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'
import * as dotenv from 'dotenv'
dotenv.config()
 
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse) {
    const uri: string = process.env.MONGODB_URI ?? ""
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db("arcade-dev")
        const collection = database.collection("random");
        const allData = await collection.find({}).toArray();

        res.status(200).json(allData);
    }
    finally {
        await client.close();
    }
}
