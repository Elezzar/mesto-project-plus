import { errors } from '../utils';

class ConflictError extends Error {
  code: number;

  constructor(message: string | undefined) {
    super(message);
    this.code = errors.conflictError.error;
  }
}

export default ConflictError;
