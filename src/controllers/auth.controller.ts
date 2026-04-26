import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { uid } from 'uid';
import { getClientInfo } from '../utils/getClientInfo';
import { LoginSession, User } from '../models';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next('Invalid credentials');
    }

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

    res.json({ message: 'Login successful', token: rawToken });
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

    if (!email || !password) {
      return next('Invalid credentials');
    }

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

    res.json({ message: 'Login successful', token: rawToken });
  } catch (error) {
    next(error);
  }
};

async function updateIpLocation(ip: string | null, loginSessionId: number) {
  try {
    if (!ip || !loginSessionId) {
      return;
    }
    const { data } = await axios.get(`https://ipinfo.io/${ip}/json`);
    const location = `${data.city || 'Unknown city'}, ${data.region || 'Unknown region'}, ${data.country || 'Unknown country'}`;

    await LoginSession.update({ location }, { where: { id: loginSessionId } });
  } catch (error) {
    console.error('Error updating IP location:', error);
  }
}
