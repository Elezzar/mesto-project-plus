/* eslint-disable no-console */

import express, { Request, Response, NextFunction } from 'express';

import mongoose from 'mongoose';

import router from './routes/index';

import { IUserID } from './utils/utils';

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(router);

app.use((req: Request, res: Response, next: NextFunction) => {
  (req as IUserID).user = {
    _id: '6681a8fb78becc6c098cf2db',
  };

  next();
});

app.listen(PORT, () => {
  console.log(`Cервер запущен на порту ${PORT}`);
});

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello, World!');
// });

// тестовые данные для захардкорженного middleware
//   "_id": {
//     "$oid": "6681a8fb78becc6c098cf2db"
//   },
//   "name": "Иван Иванов",
//   "about": "Тестовый пользователь",
//   "avatar": "https://www.flaticon.com/ru/free-icon/businessman_6998058",
//   "__v": 0
// }
