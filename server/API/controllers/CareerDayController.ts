import * as express from 'express';
import {
  controller,
  httpGet,
  httpPost,
  interfaces,
  requestParam,
  response,
  requestBody,
} from 'inversify-express-utils';
import { inject } from 'inversify';

import { ICareerDayService } from './../../Domain/Services/index';

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
   * id: employee id
   */
  @httpGet('/:id')
  private async get(
    @requestParam('id') id: string,
    @response() res: express.Response,
  ): Promise<void> {
    res.json(await this._careerDayService.getCareerDaysWithId(id));
  }

  /**
   * Add employee career days
   * req
   * req.body
   * req.body.
   */
  @httpPost('/')
  private async add(
    @requestBody() body: any,
    @response() res: express.Response,
  ): Promise<void> {
    res.json(await this._careerDayService.addCareerDay(body));
  }
}
