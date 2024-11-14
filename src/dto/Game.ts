import { GameType } from '@/enum/GameType';
import { ObjectId } from 'mongodb';

export default class Game {
  _id?: ObjectId;
  gameType: GameType;

  constructor(gameType: GameType, _id?: ObjectId) {
    this.gameType = gameType;
    this._id = _id;
  }
}
