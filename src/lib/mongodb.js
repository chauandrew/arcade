import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useNewURLParser: true,
  useUnifiedTopology: true,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();

  clientPromise = global._mongoClientPromise;
}

export default clientPromise;
