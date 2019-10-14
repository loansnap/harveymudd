export function getMortgagePayment(loanAmount, term, rate) {
  const monthlyRate = rate / 12 / 100
  return loanAmount * monthlyRate * (1 + monthlyRate) ** term / ((1 + monthlyRate) ** term - 1)
}

export function getLoanInterest(loanAmount, term, rate) {
  return term * getMortgagePayment(loanAmount, term, rate) - loanAmount
}
