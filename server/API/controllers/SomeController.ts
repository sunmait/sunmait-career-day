import * as express from 'express';
import { controller, httpGet, interfaces } from 'inversify-express-utils';
import { inject } from 'inversify';

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

  @httpGet('/objectives')
  private getObjectives(req: express.Request, res: express.Response): void {
    res.json([
      {
        id: 'qopICrgj7h',
        Text: 'test',
        CareerDayId: 'I9fSWMePe7',
        StatusId: 'S0m10t12aO',
        Progress: 1,
        CreatedAt: new Date('November 1, 2017 16:41:56'),
        UpdatedAt: new Date('November 1, 2017 16:41:56'),
      },
      {
        id: 'qgP9UxpjPn',
        Text: 'test',
        CareerDayId: 'I9fSWMePe7',
        StatusId: 'S0m10t12aO',
        Progress: 1,
        CreatedAt: new Date('November 1, 2017 16:41:56'),
        UpdatedAt: new Date('November 1, 2017 16:41:56'),
      },
      {
        id: '8JS140649M',
        Text: 'test',
        CareerDayId: 'y53yADauac',
        StatusId: 'S0m10t12aO',
        Progress: 1,
        CreatedAt: new Date('December 18, 2017 16:41:56'),
        UpdatedAt: new Date('December 18, 2017 16:41:56'),
      },
      {
        id: 'jpWfMangEX',
        Text: 'test',
        CareerDayId: 'y53yADauac',
        StatusId: 'S0m10t12aO',
        Progress: 1,
        CreatedAt: new Date('December 18, 2017 16:41:56'),
        UpdatedAt: new Date('December 18, 2017 16:41:56'),
      },
      {
        id: 'P87StAYXMW',
        Text: 'test',
        CareerDayId: 'W1UMFCm8dZ',
        StatusId: 'S0m10t12aO',
        Progress: 1,
        CreatedAt: new Date('December 18, 2017 16:41:56'),
        UpdatedAt: new Date('December 18, 2017 16:41:56'),
      },
      {
        id: 'EphDDF2Mi4',
        Text: 'test',
        CareerDayId: 'W1UMFCm8dZ',
        StatusId: 'S0m10t12aO',
        Progress: 1,
        CreatedAt: new Date('December 18, 2017 16:41:56'),
        UpdatedAt: new Date('December 18, 2017 16:41:56'),
      },

      {
        id: 'v2SfgXsSdQ',
        Text: 'objective 1',
        CareerDayId: 'N36TV1d5dT',
        StatusId: 'S0m10t12aO',
        Progress: 1,
        CreatedAt: new Date('February 1, 2018 16:41:56'),
        UpdatedAt: new Date('February 1, 2018 16:41:56'),
      },
      {
        id: 'DumQ3b0PMa',
        Text: 'objective 2',
        CareerDayId: 'N36TV1d5dT',
        StatusId: 'S0m10t12aO',
        Progress: 1,
        CreatedAt: new Date('February 1, 2018 16:41:56'),
        UpdatedAt: new Date('February 1, 2018 16:41:56'),
      },
      {
        id: 'kbNusIeCT3',
        Text: 'objective 3',
        CareerDayId: 'N36TV1d5dT',
        StatusId: 'SMfEX1aMX4',
        Progress: 0.76,
        CreatedAt: new Date('February 1, 2018 16:41:56'),
        UpdatedAt: new Date('February 1, 2018 16:41:56'),
      },
      {
        id: 'L3JXc98B7c',
        Text: 'objective 3',
        CareerDayId: 'N36TV1d5dT',
        StatusId: 'ogGrRJpbY8',
        Progress: 0,
        CreatedAt: new Date('February 1, 2018 16:41:56'),
        UpdatedAt: new Date('February 1, 2018 16:41:56'),
      },
    ]);
  }
}
