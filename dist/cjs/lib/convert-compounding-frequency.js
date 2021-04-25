"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertCompoundingFrequency = convertCompoundingFrequency;

/**
 * This is best explained by an example. Suppose you have a loan with 4% annual interest compounding
 * monthly but payments are made quarterly. The monthly interest rate is 0.04 / 12, which compounded
 * 12 times gives an APY rate of (1 + 0.04 / 12)^12 - 1 == 0.04074. We need to determine
 * the interest rate which can be compounded only 4 times (quarterly) and produce the same effective
 * interest rate of 0.04074.
 *
 * Mathematically, this is solving for x in the following equation:
 *
 * (1 + i / m) ^ m == (1 + x / q) ^ q
 *
 * Where
 *  - i is the interest rate
 *  - m is the old compounding frequency
 *  - q is the new compounding frequency
 *
 * The solution is:
 *
 * x = m * ((1 + i/m)^(m/q) - 1)
 *
 * @param {object} opts
 * @param {number} opts.interestRate - Raw interest rate, e.g. 0.03125
 * @param {number} opts.oldCompoundingFrequency - How many times per year interest compounds.
 * @param {number} opts.newCompoundingFrequency - How many times per year interest will compound after conversion.
 * @returns {number} The interest rate that has the same effect yield with the different number of compounds.
 */
function convertCompoundingFrequency({
  interestRate,
  oldCompoundingFrequency,
  newCompoundingFrequency
}) {
  return newCompoundingFrequency * (Math.pow(1 + interestRate / oldCompoundingFrequency, oldCompoundingFrequency / newCompoundingFrequency) - 1);
}