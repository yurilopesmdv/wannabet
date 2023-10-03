import Joi, { ObjectSchema } from "joi";

export const gameSchema: ObjectSchema = Joi.object({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required()
})