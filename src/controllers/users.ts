import mongoose from 'mongoose';

import {
  Request,
  Response,
} from 'express';

import User from '../models/user';

import {
  STATUS_OK,
  STATUS_CREATED,
  serverError,
  badRequestError,
  notFoundError,
  IUserRequest,
  IUserUpdate,
} from '../utils/utils';

export const getUsers = async (req: Request, res: Response) => User.find({})
  .then((users) => res.status(STATUS_OK).send(users))
  .catch(() => res.status(serverError.error).send({ message: serverError.message }));

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(notFoundError.error).send({ message: notFoundError.message });
    }
    return res.status(STATUS_OK).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res
        .status(badRequestError.error).send({ message: badRequestError.message });
    }
    return res.status(serverError.error).send({ message: serverError.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      name,
      about,
      avatar,
    } = req.body;

    const user = await User.create({
      name,
      about,
      avatar,
    });

    return res.status(STATUS_CREATED).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(badRequestError.error).send({ message: badRequestError.message });
    }

    return res.status(serverError.error).send({ message: serverError.message });
  }
};

export const updateUserInfo = async (req: IUserRequest, res: Response) => {
  try {
    const { name, about } = req.body as IUserUpdate;
    const currentUser = req.user?._id;

    if (!currentUser) {
      return res.status(badRequestError.error).send({ message: badRequestError.message });
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
      return res.status(notFoundError.error).send({ message: notFoundError.message });
    }

    return res.status(STATUS_OK).send(updatedUser);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(badRequestError.error).send({ message: badRequestError.message });
    }
    return res.status(serverError.error).send({ message: serverError.message });
  }
};

export const updateUserAvatar = async (req: IUserRequest, res: Response) => {
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
      return res.status(notFoundError.error).send({ message: notFoundError.message });
    }

    return res.status(STATUS_OK).send(updatedUser);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(badRequestError.error).send({ message: badRequestError.message });
    }
    return res.status(serverError.error).send({ message: serverError.message });
  }
};
