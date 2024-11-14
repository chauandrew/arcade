import Hangman from '@/dto/Hangman';
import GameService from './GameService';
import { ObjectId } from 'mongodb';

// TODO: have a word bank in the db
const wordList = ['instruction', 'orange', 'area', 'player', 'resource'];

async function createHangmanGame(): Promise<Hangman> {
  const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
  const hangman: Hangman = new Hangman(randomWord);
  const id = await GameService.insertGame(hangman);
  hangman._id = id;

  return hangman;
}

function isLetter(c: string) {
  return c.toLowerCase() != c.toUpperCase();
}

async function makeGuess(gameId: ObjectId, letter: string): Promise<Hangman> {
  if (!gameId) {
    throw Error('Invalid gameId!');
  }
  if (!letter || letter.length != 1 || !isLetter(letter[0])) {
    throw Error(`Invalid letter: '${letter}'`);
  }
  letter = letter.toUpperCase();

  const game: Hangman = (await GameService.getGameById(gameId)) as Hangman;

  // if already guessed, return
  if (game.isCompleted || game.lettersGuessed.find((l) => l === letter)) {
    return game;
  }

  // otherwise, make a guess and update the db
  for (let i = 0; i < game.word.length; ++i) {
    if (game.word[i] === letter) {
      game.displayWord =
        game.displayWord.substring(0, i) +
        letter +
        game.displayWord.substring(i + 1);
    }
  }
  game.lettersGuessed.push(letter);
  game.nGuesses++;

  if (game.displayWord === game.word) {
    game.isCompleted = true;
  }

  GameService.updateGame(gameId, game);
  return game;
}

const HangmanService = {
  createHangmanGame,
  makeGuess,
};

export default HangmanService;
