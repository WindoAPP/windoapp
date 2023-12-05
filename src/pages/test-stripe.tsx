import { postData } from '@/utils/helpers';
import { getStripe } from '@/utils/stripe-client';
import React from 'react';

const TestStripe = () => {
  const paid = React.useCallback(async () => {
    const { sessionId } = await postData({
      url: '/api/payment',
      data: {
        price: process.env.NEXT_PUBLIC_PRODUCT,
        user: {
          id: '',
          email: 'simpleneeraj@gmail.com',
        },
        callback: '/register',
      },
    });
    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });
  }, []);

  return (
    <div>
      Price Jo Hila De
      <button onClick={paid}>Paid</button>
    </div>
  );
};
export default TestStripe;
