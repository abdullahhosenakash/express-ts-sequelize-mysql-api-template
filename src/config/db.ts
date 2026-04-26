import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('DB Connected');
  })
  .catch((err) => {
    console.log('DB Connection Error', err);
  });

sequelize.sync({ alter: true }).then(() => {});

export default sequelize;
