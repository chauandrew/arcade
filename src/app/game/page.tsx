'use client';

import Game from '@/dto/Game';
import { useEffect, useState } from 'react';

export default function Page() {
  const [games, setGames] = useState(null);

  async function getAllGames() {
    const url = '/api/game';
    const data = await fetch(url).then((data) => data.json());
    const gamesList = data.map((game: Game) => (
      <li key={game._id}>
        GameType: {game.gameType}, id: {game._id}
      </li>
    ));
    setGames(gamesList);
  }

  useEffect(() => {
    getAllGames();
  }, []);

  if (!games) return <div>Loading...</div>;

  return (
    <div>
      <h1>All Games</h1>
      <div>
        <ul>{games}</ul>
      </div>
    </div>
  );
}
