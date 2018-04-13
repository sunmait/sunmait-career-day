import * as express from 'express';
import {
  controller,
  httpGet,
  httpPost,
  httpPatch,
  interfaces,
  response,
  requestParam,
  requestBody,
  httpDelete,
  next as nextFn,
  request,
} from 'inversify-express-utils';
import { inject } from 'inversify';

import { IObjectiveService } from './../../Domain/Services/index';
import { CheckAuth } from '../middlewares/CheckAuth';
import { IRequest } from '../helpers/index';

/**
 * Operations about objectives.
 */
@controller('/api/objectives', CheckAuth)
export class ObjectiveController implements interfaces.Controller {
  private readonly _objectiveService: IObjectiveService;

  constructor(@inject('ObjectiveService') objectiveService: IObjectiveService) {
    this._objectiveService = objectiveService;
  }

  /**
   * Get objectives
   */
  @httpGet('/:id')
  private async get(
    @requestParam('id') id: number,
    @response() res: express.Response,
    @request() req: IRequest,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json(await this._objectiveService.getObjectivesByCareerDayId(id, req.user));
    } catch (err) {
      next(err);
    }
  }

  /**
   * Add objectives
   */
  @httpPost('/')
  private async add(
    @requestBody() body: any,
    @response() res: express.Response,
    @request() req: IRequest,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json(await this._objectiveService.addObjective(body, req.user));
    } catch (err) {
      next(err);
    }
  }

  /**
   * Update objective from employee
   * id: objective
   */
  @httpPatch('/progress/:id')
  private async updateObjectiveEmployee(
    @requestParam('id') id: number,
    @requestBody() body: any,
    @response() res: express.Response,
    @request() req: IRequest,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json(await this._objectiveService.updateObjectiveEmployee(id, body.progress, req.user));
    } catch (err) {
      next(err);
    }
  }

  /**
   * Update objective from manager
   * id: objective
   */
  @httpPatch('/:id')
  private async updateObjectiveManager(
    @requestParam('id') id: number,
    @requestBody() body: any,
    @response() res: express.Response,
    @request() req: IRequest,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json(await this._objectiveService.updateObjectiveManager(id, body.title, body.description, req.user));
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete objective
   * id: objective
   */
  @httpDelete('/:id')
  private async delete(
    @requestParam('id') id: number,
    @response() res: express.Response,
    @request() req: IRequest,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json(await this._objectiveService.deleteObjective(id, req.user));
    } catch (err) {
      next(err);
    }
  }
}
