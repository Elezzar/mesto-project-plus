/* eslint-disable no-console */

import express, {
  urlencoded,
  NextFunction,
  Request,
  Response,
} from 'express';

import mongoose from 'mongoose';

import { errors } from 'celebrate';

import router from './routes/index';

import { loginUser, createUser } from './controllers/users';

import auth from './middlewares/auth';

import { errorLogger, requestLogger } from './middlewares/logger';

import ServerError from './utils/errors/ServerError';

import { validateCreateUser, validateLogin } from './utils/validation';

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(requestLogger);

app.post('/signin', validateLogin, loginUser);
app.post('/signup', validateCreateUser, createUser);

app.use(auth);
app.use(router);

app.use(errorLogger);

app.use(errors());

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ServerError) {
    err.handleError(req, res, next);
  } else {
    const serverError = new ServerError('Произошла непредвиденная ошибка');
    serverError.handleError(req, res, next);
  }
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Cервер запущен на порту ${PORT}`);
});
