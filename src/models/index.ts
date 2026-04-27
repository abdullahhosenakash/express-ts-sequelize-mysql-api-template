import LoginSession from './login.session.model';
import User from './user.model';

LoginSession.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(LoginSession, { foreignKey: 'userId', as: 'loginSessions' });

export { LoginSession, User };
