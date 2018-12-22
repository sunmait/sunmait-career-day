import * as express from 'express';
import {
  controller,
  httpGet,
  interfaces,
  response,
  requestParam,
  httpPost,
  requestBody,
  next as nextFn,
  request,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { IUserService } from '../../Domain/Services';
import { ISettingsProvider } from '../infrastructure/index';
import { CheckAuth } from '../middlewares/CheckAuth';
import { IRequest } from '../helpers/index';

/**
 * Operations about users.
 */
@controller('/api/users')
export class UserController implements interfaces.Controller {
  private readonly _userService: IUserService;
  private readonly _hostname: string;

  constructor(
    @inject('UserService') userService: IUserService,
    @inject('SettingsProvider') settingsPropvider: ISettingsProvider,
  ) {
    this._userService = userService;
    this._hostname = settingsPropvider.getHostname();
  }

  @httpPost('/')
  private async register(
    @response() res: express.Response,
    @requestBody() body: any,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res
        .status(201)
        .json(
          await this._userService.registerUser(
            body.FirstName,
            body.LastName,
            body.Email,
            body.Password,
          ),
        );
    } catch (err) {
      next(err);
    }
  }

  @httpGet('/verifyEmail/:hash')
  private async verifyEmail(
    @response() res: express.Response,
    @requestParam('hash') hash: string,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      if (await this._userService.verifyEmail(decodeURIComponent(hash))) {
        res.redirect(`${this._hostname}/verify-email?successful=true`);
      }
      res.redirect(`${this._hostname}/verify-email?successful=false`);
    } catch (err) {
      next(err);
    }
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
      res.json(await this._userService.getEmployees(req.user));
    } catch (err) {
      next(err);
    }
  }

  /**
   * Select employee
   */
  @httpGet('/selected-employee/:id', CheckAuth)
  private async selectedEmployee(
    @requestParam('id') id: number,
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
