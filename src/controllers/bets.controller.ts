import betService from "@/services/bets.service";
import { Request, Response } from "express";
import httpStatus from "http-status";

async function createBet(req: Request, res: Response) {
  try {
    const { homeTeamScore, awayTeamScore, amountBet, gameId, participantId } = req.body;
    const bet = await betService.createBet(homeTeamScore, awayTeamScore, amountBet, gameId, participantId)
    return res.status(httpStatus.CREATED).send(bet);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if (error.name === "NotEnoughtBalance") {
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
    if (error.name === "GameAlreadyFinishedError") {
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

const betsController = {
  createBet
}

export default betsController;