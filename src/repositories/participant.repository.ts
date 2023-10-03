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

async function getParticipantById(id: number) {
  return prisma.participant.findUnique({
    where: {id}
  })
}

async function updateBalance(id: number, balance: number) {
  return prisma.participant.update({
    where: {id},
    data: {balance}
  })
}

const participantRespository = {
  createParticipant,
  listParticipants,
  getParticipantById,
  updateBalance
};

export default participantRespository;
