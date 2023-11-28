import Stripe from 'stripe';

export const stripe = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY ?? '',
  {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2022-11-15',
    // Register this as an official Stripe plugin.
    // https://stripe.com/docs/building-plugins#setappinfo
    appInfo: {
      name: process.env.NEXT_PUBLIC_APP_NAME as string,
      url: process.env.NEXT_PUBLIC_BASE_URL,
      version: '0.1.0',
    },
  }
);
