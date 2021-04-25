import tap from 'tap';
import { calculateApy } from './calculate-apy.js';

tap.test('Should return the payment for a sample loan structure', async t => {
  const apy = calculateApy({ interestRate: 0.03, compoundingFrequency: 12 });
  t.equal(apy.toFixed(6), '0.030416');
});

tap.test('Uses 12 as default for compoundingFrequency', async t => {
  const apy = calculateApy({ interestRate: 0.03 });
  t.equal(apy.toFixed(6), '0.030416');
});
