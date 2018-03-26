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

/**
 * Operations about users.
 */
@controller('/api/users')
export class UserController implements interfaces.Controller {
  private readonly _userService: IUserService;

  constructor(@inject('UserService') userService: IUserService) {
    this._userService = userService;
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
        res.redirect('https://vk.com/');
      }
      // link is not valid
      res.redirect('https://ok.ru/');
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
}
