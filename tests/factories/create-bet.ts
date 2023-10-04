import { faker } from "@faker-js/faker";
import { server } from "../integration/participant.test";
import { createParticipant } from "./create-participant";
import { createGame } from "./create-game";

export async function createBet() {
  const participant = await createParticipant();
  const game = await createGame();
  const body = { 
    homeTeamScore: 10,
    awayTeamScore: 8, 
    amountBet: 1000, 
    gameId: game.id,
    participantId: participant.id 
  }
  const response = await server.post('/bets').send(body);
  return response.body;
}