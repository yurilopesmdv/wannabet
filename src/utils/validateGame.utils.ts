import gameAlreadyFinishedError from "../errors/gameFinished.error";
import notFoundError from "../errors/notFound.error";
import { Game } from "@prisma/client";

export default function validateGame(game: Game) {
  if (!game) throw notFoundError("Game");
  if (game.isFinished) throw gameAlreadyFinishedError();
}