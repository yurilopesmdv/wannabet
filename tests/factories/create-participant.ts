import { generateValidBody } from "../helpers";
import { server } from "../integration/participant.test";

export async function createParticipant() {
  const body = await generateValidBody();
  const response = await server.post('/participants').send(body);
  return response.body;
}