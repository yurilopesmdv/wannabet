import notEnoughtBalanceError from "../errors/notEnoughtBalance.error";
import participantRespository from "../repositories/participant.repository";

async function createParticipant(name: string, balance: number) {
  if (balance < 1000) {
    throw notEnoughtBalanceError("Create Participant")
  }
  const participant = await participantRespository.createParticipant(name, balance);
  return participant;
}

async function listParticipants() {
  return await participantRespository.listParticipants()
}

const participantService = {
  createParticipant,
  listParticipants
}
export default participantService;