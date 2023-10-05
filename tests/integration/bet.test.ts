import app, {init, close} from "@/app";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import httpStatus from "http-status";
import { createParticipant } from "../factories/create-participant";
import { createGame } from "../factories/create-game";

export const server = supertest(app);


beforeAll(async () => {
  await init();
  await cleanDb();
})

beforeEach(async () => {
  await cleanDb();
})

afterEach(async () => {
  await cleanDb();
})
/*
afterAll(async () => {
  await close();
})
*/
describe('Bets Tests', () => {
  it('should create a bet and return a 201 status code', async () => {
    const participant = await createParticipant();
    const game = await createGame();
    const body = { 
      homeTeamScore: 10,
      awayTeamScore: 8, 
      amountBet: 1000, 
      gameId: game.id,
      participantId: participant.id 
    }
    console.log(game)
    const response = await server.post('/bets').send(body);
    expect(response.status).toBe(httpStatus.CREATED);
  })
  it('should respond with status code 404 when game doesnt exist', async () => {
    const participant = await createParticipant();
    const body = { 
      homeTeamScore: 10,
      awayTeamScore: 8, 
      amountBet: 1000, 
      gameId: 10,
      participantId: participant.id 
    }
    const response = await server.post('/bets').send(body);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  })
  it('should respond with status code 400 when participant doesnt have enough balance', async () => {
    const participant = await createParticipant();
    const game = await createGame();
    const body = { 
      homeTeamScore: 10,
      awayTeamScore: 8, 
      amountBet: 10000, 
      gameId: game.id,
      participantId: participant.id 
    }
    const response = await server.post('/bets').send(body);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  })
  it('should respond with status code 422 when send any body parameter wrong', async () => {
    const participant = await createParticipant();
    const game = await createGame();
    const body = { 
      homeTeamName: 10,
      awayTeamScore: 8, 
      amountBet: 1000, 
      gameId: game.id,
      participantId: participant.id 
    }
    const response = await server.post('/bets').send(body);
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  })
})