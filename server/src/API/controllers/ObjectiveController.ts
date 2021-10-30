import { ICareerDayService } from '../../Domain/Services/ICareerDayService';
import * as express from 'express';
import {
  controller,
  httpGet,
  httpPost,
  httpPatch,
  response,
  requestParam,
  requestBody,
  httpDelete,
  BaseHttpController,
} from 'inversify-express-utils';
import { inject } from 'inversify';

import { IObjectiveService } from '../../Domain/Services';
import { authorize } from '../decorators';
import { UserRoles } from '../../Domain/helpers';
import { Principal } from '../providers';

/**
 * Operations about objectives.
 */
@controller('/api/objectives')
export class ObjectiveController extends BaseHttpController {
  @inject('ObjectiveService')
  private readonly _objectiveService!: IObjectiveService;

  @inject('CareerDayService')
  private readonly _careerDayService!: ICareerDayService;

  /**
   * Get objectives
   */
  // TODO: The name of the route indicates that it should return objectives, but it return career day
  @httpGet('/:id')
  @authorize({ roles: [UserRoles.MANAGER] })
  private async get(
    @requestParam('id') id: number,
    @response() res: express.Response,
  ): Promise<void> {
    const user = this.httpContext.user as Principal;
    const careerDay = await this._objectiveService.getObjectivesByCareerDayId(id);

    // Checks if career day exist
    if (!careerDay) {
      throw { status: 404 };
    }
    // Checks if authorized user is unit manager of this day
    if (careerDay.UnitManagerId !== user.details.id) {
      throw { status: 403 };
    }

    res.json(careerDay);
  }

  /**
   * Add objectives
   */
  @httpPost('/')
  @authorize({ roles: [UserRoles.MANAGER] })
  private async add(@requestBody() body: any, @response() res: express.Response): Promise<void> {
    const user = this.httpContext.user as Principal;
    const careerDay = await this._careerDayService.getCareerDayById(body.CareerDayId);

    // Checks if career day exist
    if (!careerDay) {
      throw { status: 404 };
    }
    if (
      careerDay.Archived ||
      body.EmployeeId !== careerDay.EmployeeId ||
      user.details.id !== careerDay.UnitManagerId
    ) {
      throw { status: 403 };
    }

    res.json(await this._objectiveService.addObjective(body));
  }

  /**
   * Update objective from employee
   * id: objective
   */
  @httpPatch('/progress/:id')
  @authorize({ roles: [UserRoles.EMPLOYEE] })
  private async updateObjectiveEmployee(
    @requestParam('id') id: number,
    @requestBody() body: any,
    @response() res: express.Response,
  ): Promise<void> {
    const user = this.httpContext.user as Principal;

    res.json(await this._objectiveService.updateObjectiveEmployee(id, body.progress, user.details));
  }

  /**
   * Update objective from manager
   * id: objective
   */
  @httpPatch('/:id')
  @authorize({ roles: [UserRoles.MANAGER] })
  private async updateObjectiveManager(
    @requestParam('id') id: number,
    @requestBody() body: { title: string; description: string },
    @response() res: express.Response,
  ): Promise<void> {
    const user = this.httpContext.user as Principal;

    res.json(
      await this._objectiveService.updateObjectiveManager(
        id,
        body.title,
        body.description,
        user.details,
      ),
    );
  }

  /**
   * Delete objective
   * id: objective
   */
  @httpDelete('/:id')
  @authorize({ roles: [UserRoles.MANAGER] })
  private async delete(
    @requestParam('id') id: number,
    @response() res: express.Response,
  ): Promise<void> {
    const user = this.httpContext.user as Principal;

    res.json(await this._objectiveService.deleteObjective(id, user.details));
  }
}
