import { errors } from '../utils';

class ForbiddenError extends Error {
  code: number;

  constructor(message: string | undefined) {
    super(message);
    this.code = errors.forbiddenError.error;
  }
}

export default ForbiddenError;
