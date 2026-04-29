import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  db_name: process.env.DB_NAME!,
  db_user: process.env.DB_USER!,
  db_pass: process.env.DB_PASS!,
  db_host: process.env.DB_HOST!,
  node_env: process.env.NODE_ENV!,
  api: process.env.API!,
  smtp_host: process.env.SMTP_HOST!,
  smtp_port: process.env.SMTP_PORT!,
  smtp_user: process.env.SMTP_USER!,
  smtp_password: process.env.SMTP_PASSWORD!,
  smtp_from: process.env.SMTP_FROM!
};
