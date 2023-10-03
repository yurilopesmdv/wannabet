import { prisma } from "@/config";
import calculateEarns from "@/utils/calculateEarns.utils";

async function createBet(homeTeamScore: number, awayTeamScore: number, amountBet: number, gameId: number, participantId: number) {
  return prisma.bet.create({
    data: {
      homeTeamScore,
      awayTeamScore, 
      amountBet,
      gameId,
      participantId
    }
  });
}
async function getAllBets(gameId: number) {
  const bets = await prisma.bet.findMany({
    where: {gameId}
  })
  return bets
}
async function updateBet(id: number, status: string, amountWon: number) {
  return prisma.bet.update({
    where: {id},
    data: {
      status,
      amountWon
    }
  })
}
const betRepository = {
  createBet, 
  updateBet, 
  getAllBets
};
export default betRepository;