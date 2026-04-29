import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { uid } from 'uid';
import { getClientInfo } from '../utils/getClientInfo';
import { LoginSession, User } from '../models';
import modelFiltering from '../utils/modelFiltering';
import error_message from '../utils/error_message';
import { where } from 'sequelize';

async function updateIpLocation(ip: string | null, loginSessionId: number) {
  try {
    if (!ip || !loginSessionId) {
      return;
    }
    const { data } = await axios.get(`https://ipinfo.io/${ip}/json`);
    const location = data.city
      ? `${data.city || 'Unknown city'}, ${data.region || 'Unknown region'}, ${data.country || 'Unknown country'}`
      : 'Unknown location';

    await LoginSession.update({ location }, { where: { id: loginSessionId } });
  } catch (error) {
    console.error('Error updating IP location:', error_message(error));
  }
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return next('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next('Invalid credentials');
    }

    const { device, ip } = getClientInfo(req);

    const rawToken = uid(32);
    const hashedToken = bcrypt.hashSync(rawToken, 10);

    const createdSession = await LoginSession.create({
      userId: user.id,
      token: hashedToken,
      device,
      ipAddress: ip,
      status: 'active'
    });

    updateIpLocation(ip, createdSession?.id).catch(() => {});

    const fullToken = `${createdSession.id}|${rawToken}`;

    res.json({ message: 'Login successful', token: fullToken });
  } catch (error) {
    next(error);
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, phone, password } = req.body;

    const user = await User.findOne({ where: { email }, attributes: ['id'] });

    if (user) {
      return next('User already exists');
    }

    const newUser = await User.create({
      name,
      email,
      phone,
      password: bcrypt.hashSync(password, 10)
    });

    const { device, ip } = getClientInfo(req);

    const rawToken = uid(32);
    const hashedToken = bcrypt.hashSync(rawToken, 10);

    const createdSession = await LoginSession.create({
      userId: newUser.id,
      token: hashedToken,
      device,
      ipAddress: ip,
      status: 'active'
    });

    updateIpLocation(ip, createdSession?.id).catch(() => {});

    const fullToken = `${createdSession.id}|${rawToken}`;

    res.json({ message: 'Account Created Successfully', token: fullToken });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (
  req: Request & { user?: User },
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({ ...(req.user || {}) });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: Request & { id?: number },
  res: Response,
  next: NextFunction
) => {
  try {
    const { old_password, new_password } = req.body;

    const user = await User.findOne({ where: { id: req.id } });

    if (!user) {
      return next('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(old_password, user.password);

    if (!isPasswordValid) {
      return next('Invalid password');
    }

    user.password = bcrypt.hashSync(new_password, 10);
    await user.save();

    await LoginSession.update(
      { status: 'expired' },
      { where: { userId: user.id } }
    );

    res.json({ message: 'Password changed successfully. Please login again.' });
  } catch (error) {
    next(error);
  }
};

export const getLoginSessions = async (
  req: Request & { id?: number },
  res: Response,
  next: NextFunction
) => {
  try {
    const { conditions, limit, page } = modelFiltering(req);
    conditions.where = {
      ...conditions.where,
      userId: req.id
    };

    const loginSessions = await LoginSession.findAndCountAll({
      ...conditions,
      attributes: { exclude: ['token'] }
    });

    res.json({
      totalPages: Math.ceil(loginSessions.count / limit),
      totalItems: loginSessions.count,
      currentPage: page,
      loginSessions: loginSessions.rows,
      limit
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLoginSession = async (
  req: Request & { id?: number },
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const loginSession = await LoginSession.findOne({
      where: { id, userId: req.id }
    });

    if (!loginSession) {
      return next('Invalid session');
    }

    await loginSession.destroy();

    res.json({ message: 'Session deleted successfully' });
  } catch (error) {
    next(error);
  }
};
