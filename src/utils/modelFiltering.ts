import { Op, Sequelize, WhereOptions, OrderItem } from 'sequelize';
import { Request } from 'express';

interface QueryParams {
  [key: string]: any;
}

interface FilterResult {
  conditions: {
    where: WhereOptions;
    order: OrderItem[];
    offset?: number;
    limit?: number;
    distinct: boolean;
  };
  limit: number;
  page: number;
}

function lowerEq(column: string, value?: string) {
  return Sequelize.where(Sequelize.fn('LOWER', Sequelize.col(column)), {
    [Op.eq]: decodeURIComponent(value || '').toLowerCase()
  });
}

export default function modelFiltering(req: Request): FilterResult {
  const query = req.query as QueryParams;

  const {
    order,
    sort,
    role,
    status,
    startDate,
    endDate,
    division,
    district,
    country
  } = query;

  const limit = Number(query.limit || 10);
  const page = Number(query.page || 1);
  const offset = limit && page ? limit * (page - 1) : undefined;

  const filters: WhereOptions = {};

  // ---------------- DATE FILTER ----------------
  if (startDate && endDate) {
    const field = 'createdAt';

    (filters as any)[field] = {
      [Op.between]: [startDate, endDate]
    };
  }

  const conditions: any = {
    where: { ...filters },
    order: [],
    distinct: true
  };

  // ---------------- PAGINATION ----------------
  if (limit && page) {
    conditions.limit = limit;
    conditions.offset = offset;
  }

  // ---------------- SORT ----------------
  if (sort) {
    conditions.order.push([sort, order === 'DESC' ? 'DESC' : 'ASC']);
  }

  // ---------------- ENUM FIELDS ----------------
  if (role) conditions.where.role = lowerEq('role', role);
  if (country) conditions.where.country = lowerEq('country', country);
  if (division) conditions.where.division = lowerEq('division', division);
  if (district) conditions.where.district = lowerEq('district', district);
  if (status) conditions.where.status = lowerEq('status', status);

  return { conditions, limit, page };
}
