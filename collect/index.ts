export const CURRENCYSYMBOL = {
  USD: '$',
  EUR: '€',
  JPY: '¥',
  GBP: '£',
};
export const taxes = {
  VAT: 2.08,
};

export const secrets = {
  USER_ID: 'user_id',
};

export const CURRENCY = 'GBP'.toLowerCase();
// Set your amount limits: Use float for decimal currencies and
// Integer for zero-decimal currencies: https://stripe.com/docs/currencies#zero-decimal.
export const MIN_AMOUNT = 10.0;
export const MAX_AMOUNT = 5000.0;
export const AMOUNT_STEP = 5.0;

// FOR OTP
export const OTP_LENGTH = 6;
export const OTP_EXPIRY = 30; // 30 minutes
export const OTP_MAX_ATTEMPTS = 5;

// FOR TOKEN
export const TOKEN_LENGTH = 10;
