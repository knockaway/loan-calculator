## @knockaway/loan-calculator

A set of calculator utilities related to loans.

### calculateApr

Calculates the APR (Annual Percentage Rate) of a loan with the given fees and structure.

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

// apr ~ 0.03122
```

### calculateApy

Calculates the APY (Annual Percentage Yield) of a loan with the given interest rate.

```js
import { calculateApy } from '@knockaway/loan-calculator';

const apy = calculateApy({
  interestRate: 0.03122,
  compoundingFrequency: 12
});

// apy ~ 0.03167
```

### calculatePayment

Just like the PMT function of a spreadsheet, this function calculates the periodic
payment needed to pay off the present loan balance after n periods of payments and
compounding at the given interest rate.

```js
import { calculatePayment } from '@knockaway/loan-calculator';

const pmt = calculatePayment({
  presentValue: 320000,
  interestRate: 0.03 / 12,
  numberOfPayments: 360
});

// pmt ~ 1349.13
```

### convertCompoundingFrequency

Finds the interest rate where compounding at the new annual frequency generates the same
effective annual interest as the given interest rate at the old annual frequency.

This is best explained by an example. Suppose you have a loan with 4% annual interest compounding
monthly but payments are made quarterly. The monthly interest rate is 0.04 / 12, which compounded
12 times gives an APY rate of (1 + 0.04 / 12)^12 - 1 == 0.04074. This function wlil determine
the interest rate which can be compounded only 4 times (quarterly) and produce the same effective
interest rate of 0.04074.

```js
import { convertCompoundingFrequency } from '@knockaway/loan-calculator';

const rate = convertCompoundingFrequency({
  interestRate: 0.06,
  oldCompoundingFrequency: 12,
  newCompoundingFrequency: 4
});

// rate ~ 0.0603
```
