import { errors } from '../utils';

class BadRequestError extends Error {
  code: number;

  constructor(message: string) {
    super(message);
    this.code = errors.badRequestError.error;
  }
}

export default BadRequestError;
