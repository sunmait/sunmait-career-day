import express = require('express');
import path = require('path');
import fs = require('fs');
import bodyParser = require('body-parser');

import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';

import './controllers/index';
import { container } from './infrastructure/di/Container';
import { DbContext } from '../Data/DbContext';

import {
  ErrorHandler,
  ValidationErrorHandler,
} from './middlewares/ErrorHandlers';

import { AuthProvider } from './providers';

const dbContext = container.get<DbContext>('DbContext');

dbContext
  .connect()
  .then(() => {
    // create server
    const server = new InversifyExpressServer(
      container,
      null,
      null,
      null,
      AuthProvider,
    );

    server.setConfig(application => {
      application.use(bodyParser.urlencoded({ extended: false }));
      application.use(bodyParser.json());
    });

    const app = server.build();

    const STATIC_PATH = path.join(
      __dirname,
      'public',
      process.env.NODE_ENV || 'development',
    );
    app.use(express.static(STATIC_PATH));

    app.get(
      '*',
      (
        _req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        fs.readFile(`${STATIC_PATH}/index.html`, (error, html) => {
          if (error) {
            return next(error);
          }
          res.setHeader('Content-Type', 'text/html');
          res.end(html);
        });
      },
    );

    app.use(ValidationErrorHandler);
    app.use(ErrorHandler);

    app.listen(3010);
  })
  .catch(err => console.error(err));
