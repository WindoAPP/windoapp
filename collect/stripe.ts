'use server';

import { CURRENCY } from '@/config';
import type { Stripe } from 'stripe';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createCheckoutSession(
  payload: Stripe.Checkout.SessionCreateParams
): Promise<void> {
  const origin = headers().get('origin');
  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: 'payment',
      submit_type: 'pay',
      line_items: payload.line_items,
      payment_method_types: ['card'],
      success_url: `${origin}/order/result?session_id={CHECKOUT_SESSION_ID}&source=stripe&status=success&order_id=${payload.metadata?.order_id}`,
      cancel_url: `${origin}/order`,
      currency: CURRENCY,
    });
  redirect(checkoutSession.url as string);
}

// export async function createPaymentIntent(
//   data: FormData
// ): Promise<{ client_secret: string }> {
//   const paymentIntent: Stripe.PaymentIntent =
//     await stripe.paymentIntents.create({
//       amount: formatAmountForStripe(
//         Number(data.get('customDonation') as string),
//         CURRENCY
//       ),
//       automatic_payment_methods: { enabled: true },
//       currency: CURRENCY,
//     });

//   return { client_secret: paymentIntent.client_secret as string };
// }
