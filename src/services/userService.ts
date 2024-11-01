import { Db } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import * as dotenv from 'dotenv';
import { User } from '@/dto/user';
import sha256 from 'crypto-js/sha256';
dotenv.config();

const collectionName: string = 'user';

const doesUserExist: boolean = async (email: string, username: string) => {
  if (!email || !username) {
    return false;
  }
  const db: Db = await clientPromise;
  const collection = db.collection<User>(collectionName);
  const user: User = (await collection.findOne({
    $or: [{ username: username }, { email: email }],
  })) as User;
  if (user == null) {
    return false;
  }
  return true;
};

const createUser: void = async (
  email: string,
  username: string,
  password: string,
) => {
  const db: Db = await clientPromise;
  const collection = db.collection<User>(collectionName);

  const hashedPassword = sha256(password);

  await collection.insertOne({
    email: email,
    username: username,
    password: hashedPassword.toString(),
  });
};

const UserService = {
  doesUserExist,
  createUser,
};

export default UserService;
