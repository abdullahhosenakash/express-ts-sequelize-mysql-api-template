import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  db_name: process.env.DB_NAME!,
  db_user: process.env.DB_USER!,
  db_pass: process.env.DB_PASS!,
  db_host: process.env.DB_HOST!,
  node_env: process.env.NODE_ENV!
};
