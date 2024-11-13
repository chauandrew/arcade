import { GameType } from '@/enum/GameType';
import Game from './Game';

export default class HangmanDTO extends Game {
  word: string;
  displayWord: string;
  lettersGuessed: string[];
  isCompleted: boolean;
  nGuesses: number;

  constructor(word: string, _id?: string) {
    super(GameType.Hangman, _id);
    this.word = word.toUpperCase();
    this.displayWord = '?'.repeat(word.length);
    this.lettersGuessed = [];
    this.isCompleted = false;
    this.nGuesses = 0;
  }
}
