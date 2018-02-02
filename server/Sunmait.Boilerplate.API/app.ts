import debug = require('debug');
import express = require('express');
import path = require('path');

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
app.listen(3000);

// let app = express();

//// app.use('/', routes);
//// app.use('/users', users);

//// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//    var err = new Error('Not Found');
//    err['status'] = 404;
//    next(err);
// });

//// error handlers

//// development error handler
//// will print stacktrace
// if (app.get('env') === 'development') {
//    app.use((err: any, req, res, next) => {
//        res.status(err['status'] || 500);
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
//    });
// }

//// production error handler
//// no stacktraces leaked to user
// app.use((err: any, req, res, next) => {
//    res.status(err.status || 500);
//    res.render('error', {
//        message: err.message,
//        error: {}
//    });
// });

// app.set('port', process.env.PORT || 3000);

// var server = app.listen(app.get('port'), function () {
//    debug('Express server listening on port ' + server.address().port);
// });
