## @knockaway/loan-calculator

A set of calculator utilities related to loans.

### calculateApr

```js
import { calculateApr } from '@knockaway/loan-calculator';

const apr = calculateApr({
  loanAmount: 320000,
  interestRate: 0.03,
  numberOfPayments: 360,
  paymentFrequency: 12,
  compoundingFrequency: 12,
  financedFees: 4000,
  upfrontFees: 1000
});
```

### calculateApy

```js
import { calculateApy } from '@knockaway/loan-calculator';

const apy = calculateApy({
  interestRate: 0.03,
  compoundingFrequency: 12
});
```

### calculatePayment

```js
import { calculatePayment } from '@knockaway/loan-calculator';

const pmt = calculatePayment({
  presentValue: 320000,
  interestRate: 0.03,
  numberOfPayments: 360
});
```

### convertCompoundingFrequency

```js
import { convertCompoundingFrequency } from '@knockaway/loan-calculator';

const rate = convertCompoundingFrequency({
  interestRate: 0.03,
  oldCompoundingFrequency: 12,
  newCompoundingFrequency: 4
});
```
