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
} from 'inversify-express-utils';
import { inject } from 'inversify';

import { ICareerDayService } from './../../Domain/Services/index';
import handleError from './handleError';

/**
 * Operations about Career days.
 */
@controller('/api/career-days')
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
  ): Promise<void> {
    try {
      res.json(await this._careerDayService.getCareerDaysWithId(id));
    } catch (err) {
      handleError(err, res);
    }
  }

  /**
   * Add employee career day
   */
  @httpPost('/')
  private async add(
    @requestBody() body: any,
    @response() res: express.Response,
  ): Promise<void> {
    try {
      res.json(await this._careerDayService.addCareerDay(body));
    } catch (err) {
      handleError(err, res);
    }
  }

  /**
   * Delete employee career day
   */
  @httpDelete('/:id')
  private async delete(
    @requestParam('id') id: number,
    @response() res: express.Response,
  ): Promise<void> {
    try {
      res.json(await this._careerDayService.deleteCareerDay(id));
    } catch (err) {
      handleError(err, res);
    }
  }

  /**
   * Archive employee career day
   */
  @httpPatch('/archive/:id')
  private async archive(
    @requestParam('id') id: number,
    @requestBody('UnitManagerExternalId') managerId: number,
    @response() res: express.Response,
  ): Promise<void> {
    try {
      res.json(await this._careerDayService.archiveCareerDay(id, managerId));
    } catch (err) {
      handleError(err, res);
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
    @requestBody('UnitManagerExternalId') managerId: number,
    @response() res: express.Response,
  ): Promise<void> {
    try {
      res.json(await this._careerDayService.updateCareerDayDate(id, date, employeeId, managerId));
    } catch (err) {
      handleError(err, res);
    }
  }
}
