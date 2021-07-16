import tap from 'tap';
import { calculatePayment } from './calculate-payment.js';

tap.test('Should return the payment for a sample loan structure', async t => {
  const pmt = calculatePayment({
    presentValue: 320_000,
    interestRate: 0.03,
    numberOfPayments: 360
  });
  t.equal(pmt.toFixed(2), '9600.23');
});

tap.test('Should return the correct loan payment when interest rate is 0', async t => {
  const pmt = calculatePayment({
    presentValue: 320_000,
    interestRate: 0,
    numberOfPayments: 360
  });
  t.equal(pmt.toFixed(2), '888.89');
});
