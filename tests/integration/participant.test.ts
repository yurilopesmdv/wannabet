import app, {init, close} from "@/app";
import supertest from "supertest";
import { cleanDb, generateValidBody } from "../helpers";
import httpStatus from "http-status";
import { createParticipant } from "../factories/create-participant";

export const server = supertest(app);


beforeAll(async () => {
  await init();
  await cleanDb();
})
beforeEach(async () => {
  jest.useFakeTimers()
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
describe('Participants Tests', () => {
  it('should create an participant and return a 201 status code', async () => {
    const body = generateValidBody()
    const response = await server
      .post('/participants')
      .send({
      name: "Jorge",
      balance: 1000
    })
    expect(response.status).toBe(httpStatus.CREATED)
  })
  it('should respond with status code 400 when balance is lower then R$10,00', async () => {
    const incorrectBody = {
      name: "Jorge",
      balance: 10
    }
    const response = await server.post('/participants').send(incorrectBody);
    expect(response.status).toBe(httpStatus.BAD_REQUEST)
  })
  it("should responde with status code 422 when balance isn't a number", async () => {
    const incorrectBody = {
      name: "Jorge",
      balance: "Dez reais"
    }
    const response = await server.post('/participants').send(incorrectBody);
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  })
  it('should return the list of participants and respond with status code 200', async () => {
    const participant = await createParticipant();
    const response = await server.get('/participants');
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toHaveLength(1);
  })
})