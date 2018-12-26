import express = require('express');

import { IErrorAPIWithMessage } from '../../helpers/index';
import { IValidationError } from '../../../Data/Interfaces/IValidationError';
import { IErrorResponse } from './IErrorResponse';

function isValidationError(err): err is IValidationError {
  return 'errors' in err;
}

function ValidationErrorHandler(
  err: IValidationError | IErrorAPIWithMessage,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  if (isValidationError(err)) {
    const code = 422;

    const errors: { [key: string]: string } = err.errors.reduce(
      (result, errorItem) => ({
        ...result,
        [errorItem.path]: `${errorItem.message}. Value ${errorItem.value} is not valid`,
      }),
      {},
    );

    const data: IErrorResponse = {
      status: 'error',
      message: 'Validation error',
      code,
      errors,
    };
    return res.status(code).send(data);
  }
  return next(err);
}

export default ValidationErrorHandler;
