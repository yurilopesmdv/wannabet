import { AplicationError } from "../protocols";

export default function notEnoughtBalanceError(type: string): AplicationError {
  let name = "NotEnoughtBalance"
  let message = ""
  if (type === "Create Participant") {
    message = "Insufficient balance to create a participant. The minimum balance required is 1000 cents (R$ 10.00)."
  }
  if (type === "Create Bet") {
    message = "Insufficient balance to create this bet."
  }
  return {
    name,
    message
  }
}