import { NextApiHandler } from 'next';
import { stripe } from '@/utils/stripe';
import { getURL } from '@/utils/helpers';
import { RequestBody } from '@/types';

const getCheckoutSession: NextApiHandler = async (req, res) => {
  try {
    const prices = await stripe.prices.list({
      limit: 4,
    });
    return res.status(201).json(prices.data.reverse());
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: { statusCode: 500, message: err.message } });
  }
};
const createCheckoutSession: NextApiHandler = async (req, res) => {
  const { price, user, quantity = 1 } = req.body as RequestBody;
  console.log(user);
  try {
    const customerData = {
      email: user.email,
    };
    const customer = await stripe.customers.create(customerData);

    console.log({ customer });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'link'],
      billing_address_collection: 'required',
      customer: customer?.id,
      line_items: [
        {
          price: price,
          quantity,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      subscription_data: {
        trial_from_plan: true,
      },
      success_url: `${getURL()}/register?payment=success&uid=${user.id}`,
      cancel_url: `${getURL()}/register?payment=failed&uid=${user.id}`,
    });

    return res.status(200).json({ sessionId: session.id });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: { statusCode: 500, message: err.message } });
  }
};
const setHeaders: NextApiHandler = (req, res) => {
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end('Method Not Allowed');
};
/**
 * Stripe handler for session
 * @param req
 * @param res
 */
const ApiHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return getCheckoutSession(req, res);
    case 'POST':
      return createCheckoutSession(req, res);
    default:
      return setHeaders(req, res);
  }
};

export default ApiHandler;
