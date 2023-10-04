import { faker } from "@faker-js/faker";
import { server } from "../integration/participant.test";

export async function createGame() {
  const body = {
    homeTeamName: faker.internet.userName,
    awayTeamName: faker.internet.userName
  }
  const response = await server.post('/game').send(body);
  return response.body;
}