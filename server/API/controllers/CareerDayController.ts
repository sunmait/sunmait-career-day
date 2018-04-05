import * as express from 'express';
import {
  controller,
  httpGet,
  httpPost,
  interfaces,
  requestParam,
  response,
  requestBody,
  httpDelete,
  httpPatch,
  next as nextFn,
} from 'inversify-express-utils';
import { inject } from 'inversify';

import { ICareerDayService } from './../../Domain/Services/index';
import { CheckAuth } from '../middlewares/CheckAuth';

/**
 * Operations about Career days.
 */
@controller('/api/career-days', CheckAuth)
export class CareerDayController implements interfaces.Controller {
  private readonly _careerDayService: ICareerDayService;

  constructor(@inject('CareerDayService') careerDayService: ICareerDayService) {
    this._careerDayService = careerDayService;
  }

  /**
   * Get employee career days
   */
  @httpGet('/:id')
  private async get(
    @requestParam('id') id: number,
    @response() res: express.Response,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json(await this._careerDayService.getCareerDaysWithId(id));
    } catch (err) {
      next(err);
    }
  }

  @httpGet('/active-day/:id')
  private async getCurrentCareerDay(
    @requestParam('id') id: number,
    @response() res: express.Response,
  ): Promise<void> {
    res.json(await this._careerDayService.getCurrentCareerDay(id));
  }

  /**
   * Add employee career day
   */
  @httpPost('/')
  private async add(
    @requestBody() body: any,
    @response() res: express.Response,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json(await this._careerDayService.addCareerDay(body));
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete employee career day
   */
  @httpDelete('/:id')
  private async delete(
    @requestParam('id') id: number,
    @response() res: express.Response,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json(await this._careerDayService.deleteCareerDay(id));
    } catch (err) {
      next(err);
    }
  }

  /**
   * Archive employee career day
   */
  @httpPatch('/archive/:id')
  private async archive(
    @requestParam('id') id: number,
    @response() res: express.Response,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json(await this._careerDayService.archiveCareerDay(id));
    } catch (err) {
      next(err);
    }
  }

  /**
   * Change employee career day date
   */
  @httpPatch('/update-date/:id')
  private async updateDate(
    @requestParam('id') id: number,
    @requestBody('date') date: any,
    @requestBody('EmployeeExternalId') employeeId: number,
    @response() res: express.Response,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json(
        await this._careerDayService.updateCareerDayDate(
          id,
          date,
          employeeId,
        ),
      );
    } catch (err) {
      next(err);
    }
  }
}
