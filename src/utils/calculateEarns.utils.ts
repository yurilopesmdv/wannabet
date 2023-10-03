import { Bet } from "@prisma/client";

function calculateWinners(bets: Bet[], homeTeamScore: number, awayTeamScore: number) {
  let sumWinners = 0;
  bets.forEach(b => {
    if (b.homeTeamScore === homeTeamScore && b.awayTeamScore === awayTeamScore) {
      sumWinners+= b.amountBet;
    }
  })
  return sumWinners;
}

function calculateAllBets(bets: Bet[]) {
  let sum = 0;
  bets.forEach(b => {
    sum+= b.amountBet;
  });
  return sum;
}

function calculateIndividualEarns(sumAllBets: number, sumWinners: number, amountBet: number, homeTeamScore: number, awayTeamScore: number) {
  const odd = 0.3
  const earns = (amountBet / sumWinners) * sumAllBets * (1 - odd);
  return Math.floor(earns);
}

const calculateEarns = {
  calculateWinners,
  calculateAllBets,
  calculateIndividualEarns
};

export default calculateEarns;