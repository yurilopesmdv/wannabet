import Joi, { ObjectSchema } from "joi";

export const gameSchema: ObjectSchema = Joi.object({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required()
})

export const gameFinishedSchema: ObjectSchema = Joi.object({
  homeTeamScore: Joi.number().required().min(0),
  awayTeamScore: Joi.number().required().min(0)
})