import { Sequelize } from 'sequelize';
import { env } from './env';

const sequelize = new Sequelize(env.db_name, env.db_user, env.db_pass, {
  host: env.db_host,
  dialect: 'mysql',
  logging: false
});

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
