import nodemailer from "nodemailer";
import { env_data } from "./config";

const email = env_data.email;
const pass = env_data.pass;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass,
  },
});

