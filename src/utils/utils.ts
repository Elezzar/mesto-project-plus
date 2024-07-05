import { Request } from 'express';
import { IErrors, IDeafultProfile } from './types';

export const errors: IErrors = {
  serverError: {
    error: 500,
    message: 'На сервере произошла ошибка',
  },
  badRequestError: {
    error: 400,
    message: 'Переданы некорректные данные',
  },
  unauthorizedError: {
    error: 401,
    message: 'Необходима авторизация',
  },
  forbiddenError: {
    error: 403,
    message: 'Нет доступа',
  },
  notFoundError: {
    error: 404,
    message: 'Страница не найдена',
  },
  conflictError: {
    error: 409,
    message: 'Данные уже существуют',
  },
};

export const STATUS_OK: number = 200;

export const STATUS_CREATED: number = 201;

export const defaultProfile: IDeafultProfile = {
  name: 'Жак-Ив Кусто',
  about: 'Исследователь',
  avatar: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
};

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
