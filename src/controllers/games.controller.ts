import { Response, Request } from "express";
import httpStatus from "http-status";
import gameService from "@/services/games.service";


async function createGame(req: Request, res: Response) {
  const { homeTeamName, awayTeamName } = req.body;
  try {
    const game = await gameService.createGame(homeTeamName, awayTeamName);
    return res.status(httpStatus.CREATED).send(game);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function listAllGames(req: Request, res: Response) {
  try {
    const games = await gameService.listAllGames();
    return res.status(httpStatus.OK).send(games);
  } catch (err) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }

}

async function getGameWithBets(req: Request, res: Response) {
  try {
    const gameId = parseInt(req.params.id);
    const gameWithBets = await gameService.getGameWithBets(gameId);
    return res.status(httpStatus.OK).send(gameWithBets);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

async function finishGame(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { homeTeamScore, awayTeamScore } = req.body;
    const game = await gameService.finishGame(parseInt(id), homeTeamScore, awayTeamScore);
    return res.status(httpStatus.OK).send(game);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

const gameController = {
  createGame,
  listAllGames,
  getGameWithBets,
  finishGame
}

export default gameController;