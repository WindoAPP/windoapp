import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '../../../lib/mongodb';
import Payment from '../../../models/payment';
import User from '../../../models/user';

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ error: 'Bad Request: Request data is missing.' });
    }
    const { user, amount_total, currency, success, accStatus } = req.body;
    console.log('AFTER PAYMENT DONE', req.body);
    const payment = await Payment.create({
      user: user,
      currency: currency,
      amount_total: amount_total,
      success: success,
      cretedAt: new Date(),
    });
    console.log('PAYMENT STORED', payment);

    if (payment) {
      const userData = await User.findByIdAndUpdate(user, {
        $push: { payments: payment?._id },
        $set: { accStatus: accStatus },
      });
      console.log('USER STORED', userData);

      return res.status(201).json({
        success: true,
      });
    }

    return res
      .status(500)
      .json({ error: 'Internal Server Error: Failed to save payment.' });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Internal Server Error', message: error.message });
  }
};

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.query) {
      return res
        .status(400)
        .json({ error: 'Bad Request: Query parameters are missing.' });
    }

    const { id } = req.query;

    const results = await Payment.find({ user: id });

    if (results) {
      return res.status(200).json({
        success: true,
        payments: results,
      });
    }

    return res
      .status(404)
      .json({ error: 'Not Found: No payments found for the specified user.' });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Internal Server Error', message: error.message });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToMongoDB();
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Internal Server Error', message: err.message });
  }

  switch (req.method) {
    case 'POST':
      return handlePostRequest(req, res);
    case 'GET':
      return handleGetRequest(req, res);
    default:
      return res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;
