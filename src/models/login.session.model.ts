import { Model, DataTypes } from 'sequelize';
import User from './user.model';
import sequelize from '../config/db';

class LoginSession extends Model {
  public id!: number;
  public userId!: number;
  public token!: string;
  public device!: string;
  public ipAddress!: string;
  public location?: string;
  public status!: 'active' | 'expired';
  public createdAt!: Date;
  public updatedAt!: Date;
  public user?: User;
}

LoginSession.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    token: { type: DataTypes.STRING(128), allowNull: false },
    device: { type: DataTypes.STRING(128), allowNull: true },
    ipAddress: { type: DataTypes.STRING(45), allowNull: true },
    location: { type: DataTypes.STRING(128), allowNull: true },
    status: {
      type: DataTypes.ENUM('active', 'expired'),
      defaultValue: 'active'
    },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  { sequelize: sequelize, tableName: 'login_sessions' }
);

export default LoginSession;
