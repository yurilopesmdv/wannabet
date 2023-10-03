import { Router } from "express";
import participantController from "../controllers/participants.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import { participantSchema } from "@/schemas/participant.schema";

const participantsRouter = Router();
participantsRouter
  .get('/participants', participantController.listParticipants)
  .post('/participants', validationMiddleware.validateBody(participantSchema), participantController.createParticipant)

export default participantsRouter;