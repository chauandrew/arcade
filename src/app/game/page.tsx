import GameService from '@/services/GameService';

export default async function Page() {
  const allGames = await GameService.getAllGames();

  const parsedGames = allGames.map((g) => (
    <li key={g._id}>
      GameType: {g.gameType}, id: {g._id}
    </li>
  ));

  return (
    <div>
      <h1>All Games</h1>
      <div>
        <ul>{parsedGames}</ul>
      </div>
    </div>
  );
}
