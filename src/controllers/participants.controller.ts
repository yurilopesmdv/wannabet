import { Response, Request } from "express";
import httpStatus from "http-status";
import participantService from "../services/participants.service";

async function createParticipant(req: Request, res: Response) {
  const { name, balance } = req.body;
  try {
    const participant = await participantService.createParticipant(name, Number(balance));
    return res.status(httpStatus.CREATED).send(participant);
  } catch (error) {
    if (error.name === "NotEnoughtBalance") {
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function listParticipants(req: Request, res: Response) {
  try {
    const participants = await participantService.listParticipants()
    return res.status(httpStatus.OK).send(participants)
  } catch (err) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }

}

const participantController = {
  createParticipant,
  listParticipants
}

export default participantController;