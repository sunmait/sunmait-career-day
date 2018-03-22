import * as express from 'express';

export default function handleError(err: any, res: express.Response) {
  const code = err.status || 500;
  const message = err.message || 'Something went wrong. Please try again.';

  res.status(err.status || 500);
  res.writeHead(code, message, {'content-type' : 'text/plain'});
  res.end(JSON.stringify({status: code, message}));
}
