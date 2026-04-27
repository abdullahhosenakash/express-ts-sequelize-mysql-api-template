import { NextFunction, Request, Response } from 'express';

export default async function verifyRole(
  req: Request & { id?: number; email?: string; role?: string },
  res: Response,
  next: NextFunction
) {
  try {
    const role = req.role || 'user';

    if (role === 'user') {
      return next('You are not authorized to access this route');
    }

    next();
  } catch (error: any) {
    next(error);
  }
}
