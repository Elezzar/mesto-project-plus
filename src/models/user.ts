import {
  model,
  Schema,
  Model,
  Document,
} from 'mongoose';

import validator from 'validator';

import bcrypt from 'bcrypt';

import { defaultProfile } from '../utils/utils';

import UnauthorizedError from '../utils/errors/UnauthorizedError';

// Интерфейс для описания свойств пользователя
export interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

// Схема пользователя
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: defaultProfile.name,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: defaultProfile.about,
  },
  avatar: {
    type: String,
    default: defaultProfile.avatar,
    validate: (value: string) => validator.isURL(value),
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (value: string) => validator.isEmail(value),
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// Интерфейс для поиска пользователя с паролем и email
/* eslint-disable no-unused-vars */
interface IUserModelWithCredentials extends Model<IUser> {
  findByEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<Document<IUser | null>>;
}

userSchema.static(
  'findByEmailAndPassword',
  function findByEmailAndPassword(email: string, password: string): Promise<IUser | null> {
    return this.findOne({ email })
      .select('+password')
      .then((user: IUser | null) => {
        if (!user) {
          return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
        }
        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
            }
            return user;
          });
      });
  },
);

// Модель пользователя
export default model<IUser, IUserModelWithCredentials>('user', userSchema);
