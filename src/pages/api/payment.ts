import { NextApiHandler } from 'next';
import { RequestBody } from '@/types';
import { stripe } from '@/utils/stripe';
import { generateQueryParams, getURL } from '@/utils/helpers';

interface StripePrice {
  id: string;
  object: string;
  active: boolean;
  currency: string;
  unit_amount: number;
  product: string;
  billing_scheme: string;
  metadata?: Record<string, string>;
  // Add other price properties as needed
}

const getPriceDetails = async (id: string) => {
  try {
    const price = await stripe.prices.retrieve(id);

    return price as StripePrice;
  } catch (error) {
    console.error('Error retrieving price details:', error.message);
    throw error;
  }
};

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
  const { price, user, quantity = 1, callback } = req.body as RequestBody;

  try {
    const priceData = await getPriceDetails(price);

    if (!priceData) {
      res
        .status(500)
        .json({ error: { statusCode: 500, message: 'Not Price data found' } });
    }
    const customerData = {
      email: user.email,
    };
    const customer = await stripe.customers.create(customerData);

    const payload = {
      uid: user.id,
      total: priceData.unit_amount,
      currency: priceData.currency,
    };

    const success_url = `${getURL()}${callback}?${generateQueryParams({
      payment: 'success',
      ...payload,
    })}`;
    const cancel_url = `${getURL()}${callback}?${generateQueryParams({
      payment: 'failed',
      ...payload,
    })}`;

    console.log('Success URL:', success_url);
    console.log('Cancel URL:', cancel_url);

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
      success_url,
      cancel_url,
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
