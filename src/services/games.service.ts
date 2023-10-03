import validateGame from "../utils/validateGame.utils";
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

async function finishGame(id: number, homeTeamScore: number, awayTeamScore: number) {
  const gameExists = await gameRepository.getGameById(id);
  validateGame(gameExists)
}

const gameService = {
  createGame,
  listAllGames,
  getGameWithBets,
  finishGame
}

export default gameService;