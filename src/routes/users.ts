import { Router, Request, Response } from 'express';

import {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} from '../controllers/users';

import { IUserRequest } from '../utils/utils';

const router = Router();

router.get('/', getUsers);

router.get('/:userId', getUserById);

router.post('/', createUser);

router.patch('/me', async (req: Request, res: Response) => {
  await updateUserInfo((req as IUserRequest), res);
});

router.patch('/me/avatar', async (req: Request, res: Response) => {
  await updateUserAvatar((req as IUserRequest), res);
});

export default router;
