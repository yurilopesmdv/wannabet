import { describe, it } from "node:test";
import app, {init, close} from "@/app";
import { cleanDb, generateValidBody } from "../helpers";
import supertest from "supertest";
import httpStatus from "http-status";

const server = supertest(app);

jest.useFakeTimers()
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

afterAll(async () => {
  await close();
})



describe('Participant Tests', async () => {
  it('should create an participant and return a 201 status code', async () => {
    const body = generateValidBody()
    const response = await server
      .post('/participants')
      .set('Content-Type', 'application/json')
      .send({
      name: "Jorge",
      balance: 1000
    })
    expect(response.status).toBe(httpStatus.CREATED)
  })
})