import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';

export default function log(req: Request, res: Response, next: NextFunction) {
  if (env.node_env === 'production') {
    return next();
  }

  const start = process.hrtime();
  res.on('finish', () => {
    const diff = process.hrtime(start);

    const time = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(3);
    const contentLength = res.getHeader('Content-Length') || '-';

    console.log(
      req.method,
      req.originalUrl,
      res.statusCode,
      time,
      'ms -',
      contentLength
    );
  });

  next();
}
