import { Response, NextFunction } from 'express';

import jwt, { JwtPayload } from 'jsonwebtoken';

import { JWT_SECRET } from '../config';

import UnauthorizedError from '../utils/errors/UnauthorizedError';

import { errors } from '../utils/utils';

import { IUserID } from '../utils/types';

export default (req: IUserID | JwtPayload, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(errors.unauthorizedError.message));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return next(new UnauthorizedError(errors.unauthorizedError.message));
  }
  req.user = payload;
  return next();
};
