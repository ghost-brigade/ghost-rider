import nodemailer from "nodemailer";

if (process.env.SMTP_URL === undefined) {
  throw new Error('Missing SMTP_URL environment variable');
}

const transporter = nodemailer.createTransport(process.env.SMTP_URL);

export default transporter;
