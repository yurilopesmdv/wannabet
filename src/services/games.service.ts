import validateGame from "../utils/validateGame.utils";
import notFoundError from "../errors/notFound.error";
import gameRepository from "../repositories/games.repository";
import betRepository from "@/repositories/bets.repository";
import calculateEarns from "@/utils/calculateEarns.utils";
import participantRespository from "@/repositories/participant.repository";

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
  validateGame(gameExists);
  const gameUpdated = await gameRepository.finishGame(id, homeTeamScore, awayTeamScore);

  const bets = await betRepository.getAllBets(id);
  const sumWinners = calculateEarns.calculateWinners(bets, homeTeamScore, awayTeamScore);
  const sumAllBets = calculateEarns.calculateAllBets(bets);

   
  bets.forEach(async (b) => {
    let status = "PENDING";
    if (b.homeTeamScore === homeTeamScore && b.awayTeamScore === awayTeamScore) {
      status = "WON";
      const amountWon = calculateEarns.calculateIndividualEarns(sumAllBets, sumWinners, b.amountBet, homeTeamScore, awayTeamScore)
      await betRepository.updateBet(b.id, status, amountWon);
      const participant = await participantRespository.getParticipantById(b.participantId);
      const newBalance = participant.balance + amountWon;
      await participantRespository.updateBalance(participant.id, newBalance);
    } else {
      status = "LOST";
      const amountWon = 0;
      await betRepository.updateBet(b.id, status, amountWon);
    }
  })
  return gameUpdated;
}

const gameService = {
  createGame,
  listAllGames,
  getGameWithBets,
  finishGame
}

export default gameService;