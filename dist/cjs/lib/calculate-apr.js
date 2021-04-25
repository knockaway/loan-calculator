"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateApr = calculateApr;

var _newtonRaphsonMethod = _interopRequireDefault(require("newton-raphson-method"));

var _calculatePayment = require("./calculate-payment.js");

var _convertCompoundingFrequency = require("./convert-compounding-frequency.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Calculates the APR (Annual Percentage Rate) of a loan with the given fees and structure.
 *
 * @param {object} opts
 * @param {number} opts.loanAmount - Amount to be loaned, after down payment.
 * @param {number} opts.interestRate - Raw interest rate, e.g. 0.03125
 * @param {number} opts.numberOfPayments - Number of payments in full loan term
 *  e.g. 360 for a 30 Year Mortgage paid monthly
 * @param {number} [opts.paymentFrequency=12] - How many times per year payments are made.
 * @param {number} [opts.compoundingFrequency=12] - How many times per year interest compounds.
 * @param {number} [opts.financedFees=0] - Financed fees are rolled into the loan and increase the monthly payment.
 * @param {number} [opts.upfrontFees=0] - Upfront fees effectively reduce the amount initially received in the
 *   loan instead of increasing monthly payment.
 * @returns {number} The APR, e.g. 0.03192
 */
function calculateApr({
  loanAmount,
  interestRate,
  numberOfPayments,
  paymentFrequency = 12,
  compoundingFrequency = 12,
  financedFees = 0,
  upfrontFees = 0
}) {
  // if payment frequency is different than compounding frequency, then we must
  // convert the interest rate to an equivalent rate compounded at the payment frequency.
  if (compoundingFrequency !== paymentFrequency) {
    interestRate = (0, _convertCompoundingFrequency.convertCompoundingFrequency)({
      interestRate,
      oldCompoundingFrequency: compoundingFrequency,
      newCompoundingFrequency: paymentFrequency
    });
  }

  const periodInterestRate = interestRate / paymentFrequency;
  const periodPayment = (0, _calculatePayment.calculatePayment)({
    presentValue: loanAmount + financedFees,
    interestRate: periodInterestRate,
    numberOfPayments
  }); // the present value of the loan is lessened by the upfront fees

  const loanReceived = loanAmount - upfrontFees; // Intuitively, we're trying to find the interest rate that works out to the same monthly payment, and hench
  // same total cost, as if you had received the loan without fees. That means we're looking for x such that
  //     calculatePayment({ interestRate: x }) === periodPayment
  // Or written another way,
  //     calculatePayment({ interestRate: x }) - periodPayment === 0
  // So with f(x) as defined, we're solving for f(x) === 0
  // Solving this equation isn't easy though, there isn't a good formula, so instead what we have to do is
  // use the Newton Raphson Method to numerically guess and check the right value (using periodInterestRate
  // as an initial guess) until we're within an acceptable error tolerance (1e-7 by default for this lib).

  function f(x) {
    return (0, _calculatePayment.calculatePayment)({
      presentValue: loanReceived,
      interestRate: x,
      numberOfPayments
    }) - periodPayment;
  } // fp(x) is the derivative of f(x), telling the rate of change at any given point,
  // which is useful in translating one guess into the next guess.


  function fp(x) {
    const onePlusXToNm1 = Math.pow(1 + x, numberOfPayments - 1);
    const onePlusXToN = onePlusXToNm1 * (1 + x);
    return loanReceived * onePlusXToNm1 * (x * onePlusXToN + onePlusXToN - numberOfPayments * x - x - 1) / Math.pow(onePlusXToN - 1, 2);
  }

  const payPeriodAPR = (0, _newtonRaphsonMethod.default)(f, fp, periodInterestRate);
  let apr = payPeriodAPR * paymentFrequency; // convert back to the compounding frequency

  if (compoundingFrequency !== paymentFrequency) {
    apr = (0, _convertCompoundingFrequency.convertCompoundingFrequency)({
      interestRate: apr,
      oldCompoundingFrequency: paymentFrequency,
      newCompoundingFrequency: compoundingFrequency
    });
  }

  return apr;
}