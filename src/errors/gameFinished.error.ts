import { AplicationError } from "../protocols";

export default function gameAlreadyFinishedError(): AplicationError {
  return {
    name: "GameAlreadyFinishedError",
    message: "The game you attempted to bet on has already been finalized. You cannot place bets on completed games."
  }
}