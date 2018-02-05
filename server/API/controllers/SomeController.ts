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

@controller('/api')
export class SomeController implements interfaces.Controller {
  private readonly _someService: ISomeService;

  constructor(@inject('SomeService') someService: ISomeService) {
    this._someService = someService;
  }

  @httpGet('/')
  private index(req: express.Request, res: express.Response): string {
    return this._someService.getString();
  }

  @httpGet('/employee')
  private getEmployee(req: express.Request, res: express.Response): void {
    res.json([
      {
        id: 1,
        photoUrl: 'https://vk.com/images/camera_200.png',
        fullName: 'Vasya Pupkin',
        archived: false,
      },
      {
        id: 2,
        photoUrl: 'https://vk.com/images/camera_200.png',
        fullName: 'Petya Pupkin',
        archived: false,
      },
      {
        id: 3,
        photoUrl: 'https://vk.com/images/camera_200.png',
        fullName: 'Dima Petrov',
        archived: false,
      },
      {
        id: 4,
        photoUrl:
          'https://pp.userapi.com/c836738/v836738191/6de55/3wEYIHussZI.jpg',
        fullName: 'Alexandra Tsvirko',
        archived: false,
      },
      {
        id: 5,
        photoUrl: 'https://vk.com/images/camera_200.png',
        fullName: 'Ivan Ivanov',
        archived: false,
      },
    ]);
  }
}
