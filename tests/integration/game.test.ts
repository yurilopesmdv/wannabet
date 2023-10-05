import app, { init, close } from "@/app";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import httpStatus from "http-status";
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

describe('Games Tests', () => {
  it('should create a game and return a 201 status code', async () => {
    const body = {
      homeTeamName: 'Los Angeles Lakers',
      awayTeamName: 'Boston Celtics'
    }
    const response = await server.post('/games').send(body);
    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body.homeTeamName).toBe(body.homeTeamName);
  });
  it('should respond with status code 422 when team name isnt a string', async () => {
    const invalidBody = {
      homeTeamName: 3,
      awayTeamName: 4
    };
    const response = await server.post('/games').send(invalidBody);
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it('should return the list of games and respond with status code 200', async () => {
    await createGame();
    await createGame();
    const response = await server.get('/games');
    expect(response.status).toBe(httpStatus.OK)
    expect(response.body).toHaveLength(2);
  });
  it('should respond with the game data and a list os all bets from this game', async () => {
    const game = await createGame();
    const response = await server.get(`/games/${game.id}`);
    expect(response.status).toBe(httpStatus.OK);
  });
  it("should respond with status code 404 when the game it was not created", async () => {
    const response = await server.get('/games/10');
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
})