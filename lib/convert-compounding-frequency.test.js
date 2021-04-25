import tap from 'tap';
import { convertCompoundingFrequency } from './convert-compounding-frequency.js';

tap.test('Should return the interest rate to a higher compounding frequency', async t => {
  const pmt = convertCompoundingFrequency({
    interestRate: 0.03,
    oldCompoundingFrequency: 4,
    newCompoundingFrequency: 12
  });
  t.equal(pmt.toFixed(6), '0.029925');
});

tap.test('Should return the interest rate to a lower compounding frequency', async t => {
  const pmt = convertCompoundingFrequency({
    interestRate: 0.03,
    oldCompoundingFrequency: 12,
    newCompoundingFrequency: 4
  });
  t.equal(pmt.toFixed(6), '0.030075');
});
