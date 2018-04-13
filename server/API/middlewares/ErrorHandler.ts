import express = require('express');

import { IErrorAPIWithMessage } from '../helpers/index';

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

  console.error(err);

  res.status(code);
  res.end();
}

export default ErrorHandler;
