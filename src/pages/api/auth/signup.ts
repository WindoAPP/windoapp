import { hash } from 'bcryptjs';
import { connectToMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/user';
import { randomBytes } from 'crypto';
import { NextApiHandler } from 'next';

const handlePostRequest = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: 'Request body is missing' });
  }
  const { userName, email, password, phoneNumber, shopName, shopId } = req.body;
  try {
    const hashedPassword = await hash(password, 12);
    const uid = randomBytes(16).toString('hex');

    const payload = {
      userName,
      email,
      password: hashedPassword,
      phoneNumber,
      shopName,
      shopId,
      isAdmin: false,
      uid,
      customers: [],
      createdAt: new Date(),
      dashboardConfig: {
        primaryColor: '#000',
        secondaryColor: '#fff',
        sloganColor: '#000',
        wheelItemTextSize: 25,
        spinBtnColor: '#2ebb77',
        spinBtnText: 'Rotation !',
      },
      accStatus: 'created',
      trialPeriod: 0,
    };

    const user = await User.create(payload);

    if (user) {
      return res.status(201).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: 'User already exists with the provided email' });
    }

    res.status(500).json({ message: error.message });
  }
};

const handler: NextApiHandler = async (req, res) => {
  try {
    await connectToMongoDB();
    switch (req.method) {
      case 'POST':
        return handlePostRequest(req, res);
      default:
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Internal Server Error', message: error.message });
  }
};

export default handler;
