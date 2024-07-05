import mongoose from 'mongoose';

import bcrypt from 'bcrypt';

import { Request, Response, NextFunction } from 'express';

import jwt, { JwtPayload } from 'jsonwebtoken';

import User from '../models/user';

import NotFoundError from '../utils/errors/NotFoundError';
import BadRequestError from '../utils/errors/BadRequestError';
import ConflictError from '../utils/errors/ConflictError';

import {
  STATUS_OK,
  STATUS_CREATED,
  errors,
} from '../utils/utils';

import { IUserRequest, IUserUpdate, IUserID } from '../utils/types';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => User.find({})
  .then((users) => res.status(STATUS_OK).send(users))
  .catch((next));

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return next(new NotFoundError(errors.notFoundError.message));
    }
    return res.status(STATUS_OK).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(new BadRequestError(errors.badRequestError.message));
    }
    return next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      name,
      about,
      avatar,
      email,
      password,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });

    return res.status(STATUS_CREATED).send(user);
  } catch (error: any) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(errors.badRequestError.message));
    }

    if (error.code === 11000) {
      return next(new ConflictError('Пользователь с таким email уже существует'));
    }

    return next(error);
  }
};

export const updateUserInfo = async (req: IUserRequest | any, res: Response, next: NextFunction) => {
  try {
    const { name, about } = req.body as IUserUpdate;
    const currentUser = req.user?._id;

    if (!currentUser) {
      return next(new BadRequestError(errors.badRequestError.message));
    }

    const updatedUser = await User.findByIdAndUpdate(
      currentUser,
      {
        name,
        about,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedUser) {
      return next(new NotFoundError(errors.notFoundError.message));
    }

    return res.status(STATUS_OK).send(updatedUser);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(errors.badRequestError.message));
    }
    return next(error);
  }
};

export const updateUserAvatar = async (req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    const { avatar } = req.body as IUserUpdate;
    const currentUser = req.user._id;
    const updatedUser = await User.findByIdAndUpdate(
      currentUser,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedUser) {
      return next(new NotFoundError(errors.notFoundError.message));
    }

    return res.status(STATUS_OK).send(updatedUser);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(errors.badRequestError.message));
    }
    return next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmailAndPassword(email, password);
    const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
    return res.send({ token });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(errors.badRequestError.message));
    }
    return next(error);
  }
};

export const getAuthUser = (req: IUserID | JwtPayload, res: Response, next: NextFunction) => {
  User.findById(req.user!._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(errors.notFoundError.message));
      }
      return res.status(STATUS_OK).send(user);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        return next(new BadRequestError(errors.badRequestError.message));
      }
      return next(error);
    });
};
