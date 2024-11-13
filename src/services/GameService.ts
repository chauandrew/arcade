import { Db, ObjectId, Filter } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import * as dotenv from 'dotenv';
import Game from '@/dto/Game';
dotenv.config();

const collectionName: string = 'game';

async function getAllGames(): Promise<Game[]> {
  const db: Db = await clientPromise;
  const collection = db.collection<Game>(collectionName);
  const allGames: Game[] = await collection.find({}).toArray();
  return allGames;
}

/**
 * Create a Game in the DB and return its id
 * @param game
 * @returns
 */
async function insertGame(game: Game): Promise<ObjectId> {
  const db: Db = await clientPromise;
  const collection = db.collection<Game>(collectionName);
  const created = await collection.insertOne(game);
  if (created.acknowledged) {
    return created.insertedId;
  }
  throw new Error('Failed to create a new game');
}

/**
 * Search for a game by its objectId
 * @param id ObjectId
 * @returns
 */
async function getGameById(gameId: ObjectId): Promise<Game> {
  if (!gameId) {
    throw Error(`Bad Input: id=${gameId}`);
  }
  const db: Db = await clientPromise;
  const collection = db.collection<Game>(collectionName);
  const filter: Filter<Game> = { _id: gameId };
  const game: Game = (await collection.findOne(filter)) as Game;
  if (game == null) {
    throw Error(`Could not find game with _id=${gameId}!`);
  }
  return game;
}

async function updateGame(gameId: ObjectId, game: Game): Promise<void> {
  if (!gameId) {
    throw Error(`Bad Input: id=${gameId}`);
  }

  const db: Db = await clientPromise;
  const collection = db.collection<Game>(collectionName);
  const filter: Filter<Game> = { _id: gameId };
  collection.replaceOne(filter, game);
}

const GameService = {
  getAllGames,
  insertGame,
  getGameById,
  updateGame,
};

export default GameService;
