import {
  model,
  Schema,
} from 'mongoose';

// Интерфейс для описания свойств пользователя
export interface IUser {
  name: string;
  about: string;
  avatar: string;
  _id?: string;
}

// Схема пользователя
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    required: true,
  },
});

// Модель пользователя
export default model<IUser>('user', userSchema);
