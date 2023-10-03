import notFoundError from "../errors/notFound.error";
import gameRepository from "../repositories/games.repository";

async function createGame(homeTeamName: string, awayTeamName: string) {
  return await gameRepository.createGame(homeTeamName, awayTeamName);
}

async function listAllGames() {
  return await gameRepository.listAllGames();
}

async function getGameWithBets(gameId: number) {
  const gameWithBets = await gameRepository.getGameWithBets(gameId);
  if (!gameWithBets) throw notFoundError("Game");
  return gameWithBets;
}

const gameService = {
  createGame,
  listAllGames,
  getGameWithBets
}

export default gameService;