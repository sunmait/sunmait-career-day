import * as express from 'express';
import {
  controller,
  httpGet,
  interfaces,
  response,
  requestParam,
  next as nextFn,
  request,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { IUserService } from '../../Domain/RemoteServices';
import { ISettingsProvider } from '../infrastructure/index';
import { CheckAuth } from '../middlewares/CheckAuth';
import { IRequest } from '../helpers/index';

/**
 * Operations about users.
 */
@controller('/api/users')
export class UserController implements interfaces.Controller {
  private readonly _userService: IUserService;

  constructor(@inject('UserService') userService: IUserService) {
    this._userService = userService;
  }

  /**
   * Get employees
   * id: unit manager id
   */
  @httpGet('/employees', CheckAuth)
  private async getEmployees(
    @response() res: express.Response,
    @request() req: IRequest,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json(await this._userService.getEmployees(req.user.id));
    } catch (err) {
      next(err);
    }
  }

  /**
   * Select employee
   */
  @httpGet('/selected-employee/:id', CheckAuth)
  private async selectedEmployee(
    @requestParam('id') id: string,
    @response() res: express.Response,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json(await this._userService.selectedEmployee(id));
    } catch (err) {
      next(err);
    }
  }
}
