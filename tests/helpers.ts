import { prisma } from "@/config";
import { faker } from "@faker-js/faker";

export async function cleanDb() {
  await prisma.bet.deleteMany({});
  await prisma.game.deleteMany({});
  await prisma.participant.deleteMany({});
}

export const generateValidBody = () => ({
  name: faker.internet.userName(),
  password: 1000,
});