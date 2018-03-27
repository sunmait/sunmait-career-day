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
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { IUserService } from '../../Domain/Services';
import { ISettingsProvider } from '../infrastructure/index';

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
    @requestBody('FirstName') FirstName: string,
    @requestBody('LastName') LastName: string,
    @requestBody('Email') Email: string,
    @requestBody('Password') Password: string,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json(
        await this._userService.registerUser(
          FirstName,
          LastName,
          Email,
          Password,
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
        // redirect to front page
        res.redirect(`${this._hostname}/verify-email?successful=true`);
      }
      // link is not valid
      res.redirect(`${this._hostname}/verify-email?successful=false`);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get employees
   * id: unit manager id
   */
  @httpGet('/employees')
  private async get(
    @requestParam('id') id: string,
    @response() res: express.Response,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json([
        {
          id: 1,
          Roles: 'employee',
          LastName: 'Pupkin',
          FirstName: 'Vasya',
          PhotoUrl: 'https://vk.com/images/camera_200.png',
          AccessToken: 'token',
        },
        {
          id: 2,
          Roles: 3,
          LastName: 'Pupkin',
          FirstName: 'Petya',
          PhotoUrl: 'https://vk.com/images/camera_200.png',
          AccessToken: 'token',
        },
        {
          id: 3,
          Roles: 'employee',
          LastName: 'Tsvirko',
          FirstName: 'Alexandra',
          PhotoUrl:
            'https://pp.userapi.com/c836738/v836738191/6de55/3wEYIHussZI.jpg',
          AccessToken: 'token',
        },
      ]);
    } catch (err) {
      next(err);
    }
  }

  @httpGet('/employee')
  private  async loginAsEmployee(
    @response() res: express.Response,
  ): Promise<void> {
    res.json(
      await this._userService.loginAsEmployee(),
    );
  }
}
