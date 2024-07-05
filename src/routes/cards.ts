import { Router } from 'express';

import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';

import { validateCardId, validateCreateCard } from '../utils/validation';

const router = Router();

router.get('/', getCards);

router.post('/', validateCreateCard, createCard);

router.delete('/:cardId', validateCardId, deleteCard);

router.put('/:cardId/like', validateCardId, likeCard);

router.delete('/:cardId/like', validateCardId, dislikeCard);

export default router;
