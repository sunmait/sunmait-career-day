import express = require('express');
import path = require('path');
import fs = require('fs');
import bodyParser = require('body-parser');

import 'reflect-metadata';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

import './controllers/index';
import { AllInstaller } from './infrastructure/di/AllInstaller';

import { DbContext } from '../Data/DbContext';

import IErrorAPIWithMessage from './helper/IErrorAPIWithMessage';
import ErrorHandler from './middlewares/ErrorHandler';

// set up container
const container = new Container();

const allInstaller = new AllInstaller(container);
allInstaller.install();

const dbContext = container.get<DbContext>('DbContext');

(async () => {
  try {
    await dbContext.connect();
  } catch (err) {
    console.error(err);
  }
})();

// create server
const server = new InversifyExpressServer(container);

server.setConfig(application => {
  application.use(bodyParser.urlencoded({ extended: false }));
  application.use(bodyParser.json());
});

const app = server.build();

const STATIC_PATH = path.join(__dirname, 'public', process.env.NODE_ENV);
app.use(express.static(STATIC_PATH));

app.get('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  fs.readFile(`${STATIC_PATH}/index.html`, (error, html) => {
    if (error) {
      return next(error);
    }
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
  });
});

app.use(ErrorHandler);

app.listen(3000);
