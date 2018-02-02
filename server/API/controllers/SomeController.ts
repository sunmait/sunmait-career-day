import * as express from 'express';
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  interfaces,
  queryParam,
  request,
  requestParam,
  response,
} from 'inversify-express-utils';
import { injectable, inject } from 'inversify';

import { ISomeService } from './../../Domain/Services/index';

@controller('/api/some')
export class SomeController implements interfaces.Controller {
  private readonly _someService: ISomeService;

  constructor(@inject('SomeService') someService: ISomeService) {
    this._someService = someService;
  }

  @httpGet('/')
  private index(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): string {
    return this._someService.getString();
  }
}
