import LoginSession from './login.session.model';
import User from './user.model';

LoginSession.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(LoginSession, { foreignKey: 'userId' });

export { LoginSession, User };
