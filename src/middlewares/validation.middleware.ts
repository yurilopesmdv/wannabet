import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ObjectSchema } from "joi";

function validateBody(schema: ObjectSchema) {
  return validate(schema, "body");
}
function validateParams(schema: ObjectSchema) {
  return validate(schema, "params");
}
function validate(schema: ObjectSchema, type: "body" | "params") {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[type], {
      abortEarly: false,
    });

    if (!error) {
      next();
    } else {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).send((error.details.map((d) => d.message)));
    }
  }
}

const validationMiddleware = {
  validateBody,
  validateParams
};

export default validationMiddleware;