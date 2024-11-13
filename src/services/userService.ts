import { Db } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import User from '@/dto/User';
import sha256 from 'crypto-js/sha256';

const collectionName: string = 'user';

async function doesUserExist(
  email: string,
  username: string,
): Promise<boolean> {
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
}

async function createUser(
  email: string,
  username: string,
  password: string,
): Promise<void> {
  if (await doesUserExist(email, username)) {
    throw Error('User with this email or username already exists!');
  }

  const db: Db = await clientPromise;
  const collection = db.collection<User>(collectionName);

  const hashedPassword = sha256(password);

  const user: User = new User({
    email,
    username,
    password: hashedPassword.toString(),
  });
  await collection.insertOne(user);
}

const UserService = {
  doesUserExist,
  createUser,
};

export default UserService;
