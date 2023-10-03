import Joi, { ObjectSchema } from "joi";

export const participantSchema: ObjectSchema = Joi.object({
  name: Joi.string().required(),
  balance: Joi.number().required()
})