import { AplicationError } from "../protocols";

export default function notFoundError(): AplicationError {
  return {
    name: "NotFoundError",
    message: "Game not found. The requested game could not be located"
  }
}

