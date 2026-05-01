import { NextFunction, Request, Response } from 'express';
import { LoginSession, User } from '../models';
import bcrypt from 'bcryptjs';

export default async function verifyToken(
  req: Request & { user?: User; id?: number; email?: string; role?: string },
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return next('Forbidden access');
    }

    const [sessionId, rawToken] = token.split('|');

    if (!sessionId || !rawToken) {
      return next('Bad Token');
    }

    const loginSession = await LoginSession.findOne({
      where: { id: sessionId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        }
      ]
    });

    if (!loginSession || !loginSession.user) {
      return next('Invalid access token');
    }

    if (!bcrypt.compareSync(rawToken, loginSession.token)) {
      return next('Invalid access token');
    }

    if (loginSession.status !== 'active') {
      return next('Session expired');
    }

    req.user = loginSession.user?.dataValues;
    req.id = loginSession.userId;
    req.email = loginSession.user.email;
    req.role = loginSession.user.role;

    next();
  } catch (error: any) {
    next(error);
  }
}
