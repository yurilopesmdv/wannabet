import {prisma} from "../config"
async function createParticipant(name: string, balance: number) {
  return prisma.participant.create({
    data: {
      name,
      balance
    }
  })
}
async function listParticipants() {
  return prisma.participant.findMany({})
}

const participantRespository = {
  createParticipant,
  listParticipants
};

export default participantRespository;
