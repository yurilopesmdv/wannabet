import { idSchema } from "../schemas/id.schema";
import gameController from "../controllers/games.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import { gameSchema } from "../schemas/game.schema";
import { Router } from "express";

const gamesRouter = Router();
gamesRouter
  .get('/games', gameController.listAllGames)
  .get('/games/:id', validationMiddleware.validateParams(idSchema), gameController.getGameWithBets)
  .post('/games', validationMiddleware.validateBody(gameSchema), gameController.createGame)
  .post('/games/:id/finish')

export default gamesRouter;