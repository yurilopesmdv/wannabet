import { AplicationError } from "../protocols";

export default function notFoundError(type: string): AplicationError {
  return {
    name: "NotFoundError",
    message: `${type} not found. The requested ${type} could not be located`
  }
}

