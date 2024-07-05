import { errors } from '../utils';

class UnauthorizedError extends Error {
  code: number;

  constructor(message: string | undefined) {
    super(message);
    this.code = errors.unauthorizedError.error;
  }
}

export default UnauthorizedError;
