import betsController from "@/controllers/bets.controller";
import validationMiddleware from "@/middlewares/validation.middleware";
import { betSchema } from "@/schemas/bet.schema";
import { Router } from "express";

const betsRouter = Router();
betsRouter.post('/bets', validationMiddleware.validateBody(betSchema), betsController.createBet)

export default betsRouter;