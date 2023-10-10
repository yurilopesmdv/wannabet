import Joi, { ObjectSchema } from "joi";

export const betSchema: ObjectSchema = Joi.object({
  homeTeamScore: Joi.number().required().min(0),
  awayTeamScore: Joi.number().required().min(0),
  amountBet: Joi.number().required().positive(),
  gameId: Joi.number().required().positive(),
  participantId: Joi.number().required().positive()
})