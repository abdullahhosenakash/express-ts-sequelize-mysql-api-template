import nodemailer from 'nodemailer';
import { env } from '../config/env';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export default async function sendEmail(
  email: string,
  subject: string,
  html: string
) {
  try {
    const { smtp_host, smtp_port, smtp_user, smtp_password, smtp_from } = env;
    if (
      !smtp_host ||
      !smtp_port ||
      !smtp_user ||
      !smtp_password ||
      !smtp_from
    ) {
      throw new Error('SMTP configuration is missing');
    }

    const transporter = nodemailer.createTransport({
      host: smtp_host,
      port: Number(smtp_port),
      secure: true,
      auth: {
        user: smtp_user,
        pass: smtp_password
      }
    } as SMTPTransport.Options);

    let info = await transporter.sendMail({
      from: `"${smtp_from}" <${smtp_user}>`,
      to: email,
      subject,
      html
    });
  } catch (error: any) {
    console.log(error?.message, 'mail error');
    throw error;
  }
}
