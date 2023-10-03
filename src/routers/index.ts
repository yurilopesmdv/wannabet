import { Router } from "express";
import gamesRouter from "./games.router";
import participantsRouter from "./participants.router";

const router = Router()
router
  .use(gamesRouter)
  .use(participantsRouter)

export default router;