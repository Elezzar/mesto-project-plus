import { Response, Router } from 'express';

import { notFoundError } from '../utils/utils';

import userRouter from './users';

const router = Router();

router
  .use('/users', userRouter)
  .use((res: Response) => res.status(notFoundError.error).send({ message: notFoundError.message }));

export default router;
