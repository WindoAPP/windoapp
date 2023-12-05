import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NEXT_PUBLIC_SMTP_EMAIL,
    pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
  },
});
