import { Request, Response, NextFunction } from 'express';
import { errors } from '../utils';

class ServerError extends Error {
  code: number;

  constructor(message?: string) {
    super(message);
    this.code = errors.serverError.error;
  }

  handleError(req: Request, res: Response, next: NextFunction): void {
    const { code, message } = this;
    res.status(code).send({ message: code === 500 ? errors.serverError.message : message });
  }
}

export default ServerError;

// const handleServerErrors = (err: any, req: Request, res: Response, next: NextFunction): void => {
//   const { statusCode = errors.serverError.error, message } = err;
//   res.status(statusCode).send({ message: statusCode === 500 ? errors.serverError.message : message });
// };

// export default handleServerErrors;
