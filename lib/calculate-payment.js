/**
 * Just like the PMT function of a spreadsheet, this function calculates the periodic
 * payment needed to pay off the present loan balance after n periods of payments and
 * compounding at the given interest rate.
 *
 *                              p * i * (1 + i)^n
 * calculatePayment(p, i, n) = -------------------
 *                                (1 + i)^n - 1
 *
 * @param {object} opts
 * @param {number} opts.presentValue - present value of loan
 * @param {number} opts.interestRate - Raw interest rate, e.g. 0.03125
 * @param {number} opts.numberOfPayments - number of periods
 * @returns {number} - The payment that will pay off the loan balance after n periods
 */
export function calculatePayment({ presentValue, interestRate, numberOfPayments }) {
  if (interestRate === 0) {
    return presentValue / numberOfPayments;
  }
  const iPlus1ToN = Math.pow(interestRate + 1, numberOfPayments);
  return (presentValue * interestRate * iPlus1ToN) / (iPlus1ToN - 1);
}
