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
const gameRepository = {
  createGame,
  listAllGames,
  getGameWithBets,
  getGameById
};

export default gameRepository;