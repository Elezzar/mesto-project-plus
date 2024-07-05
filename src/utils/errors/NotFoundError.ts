import { errors } from '../utils';

class NotFoundError extends Error {
  code: number;

  constructor(message: string | undefined) {
    super(message);
    this.code = errors.notFoundError.error;
  }
}

export default NotFoundError;
