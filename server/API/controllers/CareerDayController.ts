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
  request,
} from 'inversify-express-utils';
import { inject } from 'inversify';

import { ICareerDayService } from './../../Domain/Services/index';
import { CheckAuth } from '../middlewares/CheckAuth';
import { IRequest } from '../helpers/index';

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
    @requestParam('id') id: string,
    @response() res: express.Response,
    @request() req: IRequest,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json(await this._careerDayService.getCareerDaysByEmployeeId(id, req.user));
    } catch (err) {
      next(err);
    }
  }

  @httpGet('/active-day/:id')
  private async getActiveCareerDay(
    @requestParam('id') id: string,
    @response() res: express.Response,
    @request() req: IRequest,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json(await this._careerDayService.getActiveCareerDay(id, req.user));
    } catch (err) {
      next(err);
    }
  }

  /**
   * Add employee career day
   */
  @httpPost('/')
  private async add(
    @requestBody() body: any,
    @response() res: express.Response,
    @request() req: IRequest,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json(await this._careerDayService.addCareerDay(body, req.user));
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
    @request() req: IRequest,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json(await this._careerDayService.deleteCareerDay(id, req.user));
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
    @request() req: IRequest,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json(await this._careerDayService.archiveCareerDay(id, req.user));
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
    @requestBody() body: any,
    @response() res: express.Response,
    @request() req: IRequest,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json(await this._careerDayService.updateCareerDayDate(id, body.date, body.EmployeeId, req.user));
    } catch (err) {
      next(err);
    }
  }
}
