"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateApy = calculateApy;

/**
 * Calculates the APY (Annual Percentage Yield) of a loan with the given interest rate.
 *
 * @param {object} opts
 * @param {number} opts.interestRate - Raw interest rate, e.g. 0.03125
 * @param {number} [opts.compoundingFrequency=12] - How many times per year interest compounds.
 * @returns {number} The APY, e.g. 0.03192
 */
function calculateApy({
  interestRate,
  compoundingFrequency = 12
}) {
  return Math.pow(1 + interestRate / compoundingFrequency, compoundingFrequency) - 1;
}