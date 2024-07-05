import mongoose from 'mongoose';

import {
  Request,
  Response,
  NextFunction,
} from 'express';

import Card from '../models/card';

import {
  STATUS_OK,
  STATUS_CREATED,
  errors,
} from '../utils/utils';

import NotFoundError from '../utils/errors/NotFoundError';

import ForbiddenError from '../utils/errors/ForbiddenError';

import BadRequestError from '../utils/errors/BadRequestError';

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({});
    return res.status(STATUS_OK).send(cards);
  } catch (error) {
    return next(error);
  }
};

export const createCard = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    const ownerId = req.user._id;
    const card = await Card.create({
      owner: ownerId,
      name: req.body.name,
      link: req.body.link,
    });

    return res.status(STATUS_CREATED).send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(errors.badRequestError.message));
    }
    return next(error);
  }
};

export const deleteCard = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findById(cardId);

    if (!card) {
      return next(new NotFoundError(errors.notFoundError.message));
    }

    if (String(card.owner) !== req.user!._id) {
      return next(new ForbiddenError(errors.forbiddenError.message));
    }

    // Удаляем карточку
    await card.remove();
    return res.status(STATUS_OK).send(card);
  } catch (error: any) {
    if (error instanceof mongoose.Error.CastError) {
      next(new BadRequestError(errors.badRequestError.message));
    }

    return next(error);
  }
};

export const likeCard = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      return next(new NotFoundError(errors.notFoundError.message));
    }

    return res.status(STATUS_OK).send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      next(new BadRequestError(errors.badRequestError.message));
    }
    return next(error);
  }
};

export const dislikeCard = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      return next(new NotFoundError(errors.notFoundError.message));
    }

    return res.status(STATUS_OK).send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      next(new BadRequestError(errors.badRequestError.message));
    }
    return next(error);
  }
};
