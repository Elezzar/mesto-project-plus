import {
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';

import {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  getAuthUser,
} from '../controllers/users';

import { IUserRequest } from '../utils/types';

import { validateUpdateUserInfo, validateUpdateUserAvatar, validateUserId } from '../utils/validation';

const router = Router();

router.get('/', getUsers);

router.get('/:userId', validateUserId, getUserById);

router.get('/me', getAuthUser);

router.patch('/me', validateUpdateUserInfo, async (req: Request, res: Response, next: NextFunction) => {
  await updateUserInfo((req as IUserRequest), res, next);
});

router.patch('/me/avatar', validateUpdateUserAvatar, async (req: Request, res: Response, next: NextFunction) => {
  await updateUserAvatar((req as IUserRequest), res, next);
});

export default router;
