import { NextFunction, Request, Response } from 'express';
import modelFiltering from '../utils/modelFiltering';
import { User } from '../models';

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { conditions, limit, page } = modelFiltering(req);
    const users = await User.findAndCountAll({
      ...conditions,
      attributes: { exclude: ['password'] }
    });

    res.json({
      totalPages: Math.ceil(users.count / limit),
      totalItems: users.count,
      currentPage: page,
      users: users.rows,
      limit
    });
  } catch (error) {
    next(error);
  }
};
