import * as express from 'express';
import {
  controller,
  httpGet,
  httpPost,
  requestParam,
  response,
  requestBody,
  httpDelete,
  httpPatch,
  BaseHttpController,
} from 'inversify-express-utils';
import { inject } from 'inversify';

import { ICareerDayService } from './../../Domain/Services';
import { authorize } from '../decorators';
import { Principal } from '../providers';
import CareerDayEntity from '../../Data/Entities/CareerDayEntity';
import { UserRoles } from './../../Domain/helpers';

/**
 * Operations about Career days.
 */
@controller('/api/career-days')
export class CareerDayController extends BaseHttpController {
  constructor(
    @inject('CareerDayService')
    private readonly _careerDayService: ICareerDayService,
  ) {
    super();
  }

  @httpGet('/nearest-career-days')
  @authorize({ roles: [UserRoles.MANAGER] })
  private async getNearestCareerDay(
    @response() res: express.Response,
  ): Promise<void> {

    res.json(await this._careerDayService.getNearestCareerDay());
  }

  /**
   * Get employee career days
   */
  @httpGet('/:id')
  @authorize({ roles: [UserRoles.MANAGER] })
  private async get(
    @requestParam('id') id: string,
    @response() res: express.Response,
  ): Promise<void> {
    res.json(await this._careerDayService.getCareerDaysByEmployeeId(id));
  }

  @httpGet('/active-day/:id')
  @authorize({ roles: [UserRoles.EMPLOYEE] })
  private async getActiveCareerDay(
    @requestParam('id') id: string,
    @response() res: express.Response,
  ): Promise<void> {
    // Checks if an authorized user is the same user
    const user = this.httpContext.user as Principal;
    if (user.details.id !== id) {
      throw { status: 403 };
    }

    res.json(await this._careerDayService.getActiveCareerDay(id));
  }

  /**
   * Add employee career day
   */
  @httpPost('/')
  @authorize({ roles: [UserRoles.MANAGER] })
  private async add(
    @requestBody() body: Partial<CareerDayEntity>,
    @response() res: express.Response,
  ): Promise<void> {
    // Checks if authorized user add career day as UnitManager
    const user = this.httpContext.user as Principal;
    if (
      !body.UnitManagerId ||
      !body.EmployeeId ||
      user.details.id !== body.UnitManagerId
    ) {
      throw { status: 403 };
    }

    // Checks if an employee already has active career day
    const activeCareerDay = await this._careerDayService.getActiveCareerDay(
      body.EmployeeId,
    );
    if (activeCareerDay) {
      throw { status: 403 };
    }

    res.json(await this._careerDayService.addCareerDay(body));
  }

  /**
   * Delete employee career day
   */
  @httpDelete('/:id')
  @authorize({ roles: [UserRoles.MANAGER] })
  private async delete(
    @requestParam('id') id: number,
    @response() res: express.Response,
  ): Promise<void> {
    // Checks if career day exist
    const careerDayToDelete = await this._careerDayService.getCareerDayById(id);
    if (!careerDayToDelete) {
      throw { status: 404 };
    }

    // Checks if user has access to delete career day
    const user = this.httpContext.user as Principal;
    if (
      careerDayToDelete.UnitManagerId !== user.details.id ||
      !careerDayToDelete.Archived
    ) {
      throw { status: 403 };
    }

    res.json(await this._careerDayService.deleteCareerDay(id));
  }

  /**
   * Archive employee career day
   */
  @httpPatch('/archive/:id')
  @authorize({ roles: [UserRoles.MANAGER] })
  private async archive(
    @requestParam('id') id: number,
    @response() res: express.Response,
  ): Promise<void> {
    const user = this.httpContext.user as Principal;
    res.json(await this._careerDayService.archiveCareerDay(id, user.details));
  }

  /**
   * Change employee career day date
   */
  @httpPatch('/update-date/:id')
  @authorize({ roles: [UserRoles.MANAGER] })
  private async updateDate(
    @requestParam('id') id: number,
    @requestBody()
    body: {
      date: string;
      EmployeeId: CareerDayEntity['EmployeeId'];
    },
    @response() res: express.Response,
  ): Promise<void> {
    const user = this.httpContext.user as Principal;
    res.json(
      await this._careerDayService.updateCareerDayDate(
        id,
        body.date,
        body.EmployeeId,
        user.details,
      ),
    );
  }
}
