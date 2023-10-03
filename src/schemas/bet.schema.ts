import Joi, { ObjectSchema } from "joi";

export const betSchema: ObjectSchema = Joi.object({
  homeTeamScore: Joi.number().required().positive(),
  awayTeamScore: Joi.number().required().positive(),
  amountBet: Joi.number().required().positive(),
  gameId: Joi.number().required().positive(),
  participantId: Joi.number().required().positive()
})