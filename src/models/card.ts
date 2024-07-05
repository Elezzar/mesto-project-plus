import {
  model,
  Schema,
  ObjectId,
  Date,
} from 'mongoose';

import validator from 'validator';

// Интерфейс для описания свойств карточки
export interface ICard {
  name: string;
  link: string;
  owner: ObjectId;
  likes: ObjectId[];
  createdAt: Date;
}

// Схема карточки
const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: (value: string) => validator.isURL(value),
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: [Schema.Types.ObjectId],
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Модель карточки
export default model<ICard>('card', cardSchema);
