import { AplicationError } from "../protocols";

export default function notEnoughtBalanceError(): AplicationError {
  return {
    name: "NotEnoughtBalance",
    message: "Insufficient balance to create a participant. The minimum balance required is 1000 cents (R$ 10.00)."
  }
}