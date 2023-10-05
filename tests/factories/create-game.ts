import { faker } from "@faker-js/faker";
import { server } from "../integration/participant.test";

export async function createGame() {
  const body = {
    homeTeamName: "Luiz",
    awayTeamName: "Jorge"
  }
  const response = await server.post('/games').send(body);
  return response.body;
}