import tap from 'tap';
import { calculateApr } from './calculate-apr.js';

tap.test('Should return the correct result using defaults', async t => {
  const apr = calculateApr({
    loanAmount: 320_000,
    interestRate: 0.03,
    numberOfPayments: 360
  });
  t.equal(apr.toFixed(6), '0.030000');
});

tap.test('Should return the correct APR for only upfront fees', async t => {
  const apr = calculateApr({
    loanAmount: 320_000,
    interestRate: 0.03,
    numberOfPayments: 360,
    paymentFrequency: 12,
    compoundingFrequency: 12,
    financedFees: 0,
    upfrontFees: 7740
  });
  t.equal(apr.toFixed(6), '0.031925');
});

tap.test('Should return the correct APR for only financed fees', async t => {
  const apr = calculateApr({
    loanAmount: 320_000,
    interestRate: 0.03,
    numberOfPayments: 360,
    paymentFrequency: 12,
    compoundingFrequency: 12,
    financedFees: 7740,
    upfrontFees: 0
  });
  t.equal(apr.toFixed(6), '0.031878');
});

tap.test('Should return the correct APR with financed and upfront fees', async t => {
  const apr = calculateApr({
    loanAmount: 320_000,
    interestRate: 0.03,
    numberOfPayments: 360,
    paymentFrequency: 12,
    compoundingFrequency: 12,
    financedFees: 4000,
    upfrontFees: 6500
  });
  t.equal(apr.toFixed(6), '0.032594');
});

tap.test('Should return the correct APR with lower payment frequency', async t => {
  const apr = calculateApr({
    loanAmount: 320_000,
    interestRate: 0.03,
    numberOfPayments: 60,
    paymentFrequency: 4,
    compoundingFrequency: 12,
    financedFees: 4000,
    upfrontFees: 6500
  });
  t.equal(apr.toFixed(6), '0.034704');
});

tap.test('Should return the correct APR with higher payment frequency', async t => {
  const apr = calculateApr({
    loanAmount: 320_000,
    interestRate: 0.03,
    numberOfPayments: 180,
    paymentFrequency: 12,
    compoundingFrequency: 4,
    financedFees: 4000,
    upfrontFees: 6500
  });
  t.equal(apr.toFixed(6), '0.034786');
});
