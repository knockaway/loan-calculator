## @knockaway/loan-calculator

The goal of this project is to make loan calculations as simple as
using any one of the free online loan calculators. Just inputs and
outputs!

Do you have an idea for a loan-calculator function? We welcome
open source contributions!

Brought to you by the developers at [Knock](https://www.knock.com/),
who found the need to calculate APR, APY, and monthly payments for features
related to the [Knock Home Swap](https://www.knock.com/how-it-works).

It may be used by both CJS and ESM module formats.

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

##### Parameters

- `loanAmount` Amount to be loaned, after down payment.
- `interestRate` Raw interest rate, e.g. 0.03125
- `numberOfPayments` Number of payments in full loan term, e.g. 360 for a
  30 Year Mortgage paid monthly
- `paymentFrequency` How many times per year payments are made. Default: 12
- `compoundingFrequency` How many times per year interest compounds. Default: 12
- `financedFees` Financed fees are rolled into the loan and increase the
  monthly payment. Default: 0
- `upfrontFees` Upfront fees effectively reduce the amount initially received in the
  loan instead of increasing monthly payment. Default: 0

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

##### Parameters

- `interestRate` Raw interest rate, e.g. 0.03125
- `compoundingFrequency` How many times per year interest compounds. Default: 12

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

##### Parameters

- `presentValue` Present value of the loan
- `interestRate` Raw interest rate, e.g. 0.03125
- `numberOfPayments` Number of payments in full loan term, e.g. 360 for a
  30 Year Mortgage paid monthly

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

##### Parameters

- `interestRate` Raw interest rate, e.g. 0.03125
- `oldCompoundingFrequency` How many times per year interest compounds.
- `newCompoundingFrequency` How many times per year interest will compound after conversion.
