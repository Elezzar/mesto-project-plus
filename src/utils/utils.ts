import { Request } from 'express';

interface IError {
  error: number,
  message: string,
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

export const serverError: IError = {
  error: 500,
  message: 'На сервере произошла ошибка',
};

export const badRequestError: IError = {
  error: 400,
  message: 'Переданы некорректные данные',
};

export const notFoundError: IError = {
  error: 404,
  message: 'Страница не найдена',
};

export const STATUS_OK: number = 200;

export const STATUS_CREATED: number = 201;
