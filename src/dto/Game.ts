import { GameType } from '@/enum/GameType';

export default class Game {
  _id?: string;
  gameType: GameType;

  constructor(gameType: GameType, _id?: string) {
    this.gameType = gameType;
    this._id = _id;
  }
}
