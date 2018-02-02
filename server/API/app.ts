import debug = require('debug');
import express = require('express');
import path = require('path');
import fs = require('fs');

import 'reflect-metadata';
import { Container } from 'inversify';
import {
  interfaces,
  InversifyExpressServer,
  TYPE,
} from 'inversify-express-utils';

import './controllers/index';
import { DomainInstaller } from './infrastructure/di/DomainInstaller';

// set up container
const container = new Container();

const domainInstaller = new DomainInstaller(container);
domainInstaller.install();

// set up bindings
// container.bind<FooService>('FooService').to(FooService);

// create server
const server = new InversifyExpressServer(container);

server.setConfig(application => {
  // register middlewares
});

const app = server.build();
const STATIC_PATH = path.join(__dirname, 'public', process.env.NODE_ENV);
app.use(express.static(STATIC_PATH));
app.get('*', (req, res) => {
  fs.readFile(`${STATIC_PATH}/index.html`, (error, html) => {
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
  });
});
app.listen(3000);
