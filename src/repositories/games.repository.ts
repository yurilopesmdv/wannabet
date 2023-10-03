import { prisma } from "@/config";

async function createGame(homeTeamName: string, awayTeamName: string) {
  return prisma.game.create({
    data: {
      homeTeamName,
      awayTeamName
    }
  });
}

async function listAllGames() {
  return prisma.game.findMany({});
}

async function getGameWithBets(id: number) {
  return prisma.game.findUnique({
    where: {id},
    include: {
      Bet: true
    }
  })
}

async function getGameById(id: number) {
  return prisma.game.findUnique({
    where: {id}
  })
}

async function finishGame(id: number, homeTeamScore: number, awayTeamScore: number) {
  return prisma.game.update({
    where: {id},
    data: {
      homeTeamScore,
      awayTeamScore,
      isFinished: true
    }
  })
}
const gameRepository = {
  createGame,
  listAllGames,
  getGameWithBets,
  getGameById,
  finishGame
};

export default gameRepository;