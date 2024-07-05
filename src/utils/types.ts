import { Request } from 'express';

export interface IError {
  error: number,
  message: string,
}

export interface IErrors {
  serverError: IError,
  badRequestError: IError,
  unauthorizedError: IError,
  forbiddenError: IError,
  notFoundError: IError,
  conflictError: IError,
}

export interface IUserID extends Request {
  user: {
    _id: string;
  }
}

export interface IUserRequest extends Request {
  user: {
    _id: string;
    name: string;
    about: string;
    avatar: string;
  }
}

export interface IUserUpdate {
  name?: string;
  about?: string;
  avatar?: string;
}

export interface IDeafultProfile {
  name: string;
  about: string;
  avatar: string;
}
