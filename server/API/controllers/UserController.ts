import * as express from 'express';
import {
  controller,
  httpGet,
  response,
  requestParam,
  BaseHttpController,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { IUserService } from '../../Domain/RemoteServices';
import { authorize } from '../decorators';
import { UserRoles } from '../../Domain/helpers';
import { Principal } from './../providers';

/**
 * Operations about users.
 */
@controller('/api/users')
export class UserController extends BaseHttpController {
  private readonly _userService: IUserService;

  constructor(@inject('UserService') userService: IUserService) {
    super();
    this._userService = userService;
  }

  /**
   * Get employees
   * id: unit manager id
   */
  @httpGet('/employees')
  @authorize({ roles: [UserRoles.MANAGER] })
  private async getEmployees(@response() res: express.Response): Promise<void> {
    const user = this.httpContext.user as Principal;
    res.json(await this._userService.getEmployees(user.details.id));
  }

  /**
   * Select employee
   */
  @httpGet('/selected-employee/:id')
  @authorize()
  private async selectedEmployee(
    @requestParam('id') id: string,
    @response() res: express.Response,
  ): Promise<void> {
    const selectedEmployee = await this._userService.selectedEmployee(id);
    if (!selectedEmployee) {
      throw { status: 404 };
    }
    res.json(selectedEmployee);
  }

  @httpGet('/manageEmployees')
  @authorize({ roles: [UserRoles.MANAGER] })
  private async getAllFreeUsers(
    @response() res: express.Response,
    ): Promise<void> {
      const user = this.httpContext.user as Principal;
      const selectedUsers = await this._userService.getAllFreeUsers(user.details.id);
      if (!selectedUsers) {
        throw { status: 404 };
      }
      res.json(selectedUsers);
  }

  @httpGet('/updateManageEmployees/:id')
  @authorize({ roles: [UserRoles.MANAGER] })
  private async updateAllFreeUsers(
    @requestParam('id') employeeId: string,
    @response() res: express.Response,
    ): Promise<void> {
      const user = this.httpContext.user as Principal;
      await this._userService.updateManagedUsers(employeeId, user.details.id);
      const selectedUsers = await this._userService.getAllFreeUsers(user.details.id);
      if (!selectedUsers) {
        throw { status: 404 };
      }
      res.json(selectedUsers);
  }

}
