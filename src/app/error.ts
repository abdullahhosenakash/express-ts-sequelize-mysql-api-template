import { Request, Response, NextFunction } from 'express';

function notFoundHandler(_req: Request, res: Response, next: NextFunction) {
  const error: any = new Error('Not Found');
  error.status = 404;
  next(error);
}

function errorHandler(
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error?.status) {
    return res.status(error.status).json({
      message: error?.message
    });
  }
  if (error) return res.status(403).json({ message: error?.message || error });
  return res.status(500).json({ message: 'Server error' });
}

export { notFoundHandler, errorHandler };
