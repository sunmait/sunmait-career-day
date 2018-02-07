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

  @httpGet('/careerDays')
  private getCareerDays(req: express.Request, res: express.Response): void {
    res.json([
      {
        id: 'N36TV1d5dT',
        Archived: false,
        EmployeeExternalId: 'PgZS0RYwZm',
        UnitManagerExternalId: 'XQnGIMhxvR',
        InterviewDate: new Date('February 28, 2018 15:00:00'),
        CreatedAt: new Date('February 1, 2018 16:41:56'),
        UpdatedAt: new Date('February 21, 2018 11:41:33'),
      },
      {
        id: 'W1UMFCm8dZ',
        Archived: true,
        EmployeeExternalId: 'PgZS0RYwZm',
        UnitManagerExternalId: 'XQnGIMhxvR',
        InterviewDate: new Date('January 30, 2018 15:00:00'),
        CreatedAt: new Date('January 1, 2018 16:41:56'),
        UpdatedAt: new Date('November 21, 2018 11:41:33'),
      },
      {
        id: 'y53yADauac',
        Archived: true,
        EmployeeExternalId: 'PgZS0RYwZm',
        UnitManagerExternalId: 'XQnGIMhxvR',
        InterviewDate: new Date('December 31, 2017 15:00:00'),
        CreatedAt: new Date('December 18, 2017 16:41:56'),
        UpdatedAt: new Date('December 21, 2017 11:41:33'),
      },
      {
        id: 'I9fSWMePe7',
        Archived: true,
        EmployeeExternalId: 'PgZS0RYwZm',
        UnitManagerExternalId: 'XQnGIMhxvR',
        InterviewDate: new Date('December 17, 2017 15:00:00'),
        CreatedAt: new Date('November 1, 2017 16:41:56'),
        UpdatedAt: new Date('November 21, 2017 11:41:33'),
      },
    ]);
  }
}
