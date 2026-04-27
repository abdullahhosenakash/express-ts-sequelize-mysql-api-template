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
      return res.sendStatus(401);
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.sendStatus(403);
    }

    const [sessionId, rawToken] = token.split('|');

    if (!sessionId || !rawToken) {
      return res.sendStatus(403);
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

    console.log(loginSession, 'session');

    if (!loginSession || !loginSession.user) {
      return next('Invalid access token');
    }

    if (!bcrypt.compareSync(rawToken, loginSession.token)) {
      console.log('Invalid access token');
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
