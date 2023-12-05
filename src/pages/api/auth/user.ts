import { connectToMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/user';
import Customer from '../../../../models/customer';
import Notification from '../../../../models/notification';
import { hash } from 'bcryptjs';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  try {
    await connectToMongoDB();
    switch (req.method) {
      case 'GET':
        await handleGetRequest(req, res);
        break;
      case 'PUT':
        await handlePutRequest(req, res);
        break;
      case 'POST':
        await handlePostRequest(req, res);
        break;
      default:
        res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleGetRequest = async (req, res) => {
  try {
    const result = await User.findOne({
      uid: req.query.id,
    }).populate({
      path: 'customers',
      model: Customer,
    });

    if (!result) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const notifications = await Notification.find({
      user: result._id,
      isRead: false,
    });

    if (notifications) {
      return res.status(201).json({
        success: true,
        user: result,
        notificationCount: notifications.length,
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handlePutRequest = async (req, res) => {
  try {
    const user = req.body;
    if (user.password) {
      const hashedPassword = await hash(user.password, 12);
      if (hashedPassword) {
        user.password = hashedPassword;
      }
    }

    const result = await User.findOneAndUpdate({ _id: user._id }, user);

    if (!result) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(201).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handlePostRequest: NextApiHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required.' });
    }

    const hashedPassword = await hash(password, 12);

    const result = await User.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } }
    );

    if (!result) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(201).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
