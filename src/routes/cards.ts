import { Router } from 'express';

import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';

const router = Router();

router.get('/', getCards);

router.post('/', createCard);

router.delete('/:cardId', deleteCard);

router.put('/:cardId/like', likeCard);

router.delete('/:cardId/like', dislikeCard);

export default router;
