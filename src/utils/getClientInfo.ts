import { Request } from 'express';
import requestIp from 'request-ip';

export function getClientInfo(req: Request) {
  try {
    const device = req.headers['user-agent'] || 'Unknown Device';
    const ip = requestIp.getClientIp(req) || null;
    return { device, ip };
  } catch (error) {
    return { device: 'Unknown Device', ip: null };
  }
}
