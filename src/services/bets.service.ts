import { Participant } from "@prisma/client";
import notFoundError from "../errors/notFound.error";
import gameRepository from "../repositories/games.repository";
import participantRespository from "../repositories/participant.repository";
import notEnoughtBalanceError from "../errors/notEnoughtBalance.error";
import betRepository from "../repositories/bets.repository";
import validateGame from "../utils/validateGame.utils";

async function createBet(homeTeamScore: number, awayTeamScore: number, amountBet: number, gameId: number, participantId: number) {
  const gameExists = await gameRepository.getGameById(gameId);
  validateGame(gameExists);
  const participantExists = await participantRespository.getParticipantById(participantId);
  validateParticipant(participantExists, amountBet);
  const bet = await betRepository.createBet(homeTeamScore, awayTeamScore, amountBet, gameId, participantId);
  const newBalance = participantExists.balance - amountBet
  await participantRespository.updateBalance(participantId, newBalance);
  return bet;
}

function validateParticipant(participant: Participant, amountBet: number) {
  if (!participant) throw notFoundError("Participant");
  if (participant.balance < amountBet) throw notEnoughtBalanceError("Create Bet");
}

const betService = {
  createBet
};

export default betService;