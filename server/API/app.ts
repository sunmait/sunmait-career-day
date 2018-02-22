import express = require('express');
import path = require('path');
import fs = require('fs');
import bodyParser = require('body-parser');

import 'reflect-metadata';
import {Container} from 'inversify';
import {InversifyExpressServer} from 'inversify-express-utils';

import './controllers/index';
import {AllInstaller} from './infrastructure/di/AllInstaller';

import {DbContext} from '../Data/DbContext';

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
  application.use(bodyParser.urlencoded({extended: false}));
  application.use(bodyParser.json());
});

const app = server.build();

const STATIC_PATH = path.join(__dirname, 'public', process.env.NODE_ENV);
app.use(express.static(STATIC_PATH));

app.get('*', (req: express.Request, res: express.Response) => {
  fs.readFile(`${STATIC_PATH}/index.html`, (error, html) => {
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
  });
});

app.listen(3000);
