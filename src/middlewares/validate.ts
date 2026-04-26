import { Request, Response, NextFunction } from 'express';
import { ZodObject } from 'zod';

export default function validate(schema: ZodObject<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      });

      next();
    } catch (error: any) {
      const message = JSON.parse(error)?.[0]?.message;
      console.log(message, 'message');
      return next(message);
    }
  };
}
