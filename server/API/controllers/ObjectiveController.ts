import * as express from 'express';
import {
  controller,
  httpGet,
  httpPost,
  interfaces,
  response,
  requestParam,
  requestBody,
} from 'inversify-express-utils';
import { inject } from 'inversify';

import { IObjectiveService } from './../../Domain/Services/index';

/**
 * Operations about objectives.
 */
@controller('/api/objectives')
export class ObjectiveController implements interfaces.Controller {
  private readonly _objectiveService: IObjectiveService;

  constructor(@inject('ObjectiveService') objectiveService: IObjectiveService) {
    this._objectiveService = objectiveService;
  }

  /**
   * Get objectives
   * id: employee id
   */
  @httpGet('/:id')
  private async get(
    @requestParam('id') id: number,
    @response() res: express.Response,
  ): Promise<void> {
    res.json(await this._objectiveService.getObjectivesByCareerDayId(id));
  }

  /**
   * Add objectives
   */
  @httpPost('/')
  private async add(
    @requestBody() body: any,
    @response() res: express.Response,
  ): Promise<void> {
    res.json(await this._objectiveService.addObjective(body));
  }
}
