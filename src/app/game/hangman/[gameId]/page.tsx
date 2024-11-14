'use client';

export default async function Page({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const gameId = (await params).gameId;
  return (
    <div>
      <h1>GameId:</h1>
      <p>{gameId}</p>
    </div>
  );
}
