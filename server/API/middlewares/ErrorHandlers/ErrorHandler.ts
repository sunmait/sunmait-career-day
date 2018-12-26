import express = require('express');

import { IErrorAPIWithMessage } from '../../helpers/index';
import { IErrorResponse } from './IErrorResponse';

function ErrorHandler(
  err: IErrorAPIWithMessage,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const code = err.status || 500;

  if (err.hasOwnProperty('message')) {
    res.statusCode = code;
    res.statusMessage = err.message;
  }
  const data: IErrorResponse = {
    status: 'error',
    code,
    message: err.message,
  };

  console.error(err);

  res.status(code).send(data);
  res.end();
}

export default ErrorHandler;
