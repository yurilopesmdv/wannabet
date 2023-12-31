import { Router } from "express";
import gamesRouter from "./games.router";
import participantsRouter from "./participants.router";
import betsRouter from "./bets.router";

const router = Router()
router
  .use(gamesRouter)
  .use(participantsRouter)
  .use(betsRouter)

export default router;