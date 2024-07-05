import { Request, Response, Router } from 'express';

import { errors } from '../utils/utils';

import userRouter from './users';

import cardRouter from './cards';

const router = Router();

router
  .use('/users', userRouter)
  .use('/cards', cardRouter)
  .use((req: Request, res: Response) => res.status(errors.notFoundError.error).send({ message: errors.notFoundError.message }));

export default router;
