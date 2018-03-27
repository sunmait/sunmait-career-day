import * as express from 'express';
import {
  controller,
  httpPost,
  httpPatch,
  interfaces,
  response,
  requestParam,
  requestBody,
  next as nextFn,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { IAuthService } from '../../Domain/Services';

/**
 * Operations about objectives.
 */
@controller('/api/auth')
export class AuthController implements interfaces.Controller {
  private readonly _authService: IAuthService;

  constructor(@inject('AuthService') authService: IAuthService) {
    this._authService = authService;
  }

  @httpPost('/')
  private async auth(
    @response() res: express.Response,
    @requestBody('Email') Email: string,
    @requestBody('Password') Password: string,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json(await this._authService.authWithEmailAndPassword(Email, Password));
    } catch (err) {
      next(err);
    }
  }

  @httpPatch('/refresh/:refreshToken')
  private async refreshSesstion(
    @response() res: express.Response,
    @requestParam('refreshToken') refreshToken: string,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json(await this._authService.refreshSesstion(refreshToken));
    } catch (err) {
      next(err);
    }
  }
}
