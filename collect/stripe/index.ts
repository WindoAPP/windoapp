import 'server-only';

import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2023-10-16',
  appInfo: {
    name: process.env.NEXT_PUBLIC_APP_NAME as string,
    url: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
