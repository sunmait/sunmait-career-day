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
  httpDelete,
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
    @requestBody() body: any,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json(await this._authService.authWithEmailAndPassword(body.Email, body.Password));
    } catch (err) {
      next(err);
    }
  }

  @httpPatch('/refresh/:refreshToken')
  private async refreshSession(
    @response() res: express.Response,
    @requestParam('refreshToken') refreshToken: string,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json(await this._authService.refreshSession(refreshToken));
    } catch (err) {
      next(err);
    }
  }

  @httpPatch('/verify-credentials')
  private async verifyCredentials(
    @response() res: express.Response,
    @requestBody() body: any,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json(await this._authService.verifyCredentials(body));
    } catch (err) {
      next(err);
    }
  }

  @httpDelete('/:refreshToken')
  private async logout(
    @response() res: express.Response,
    @requestParam('refreshToken') refreshToken: string,
    @nextFn() next: express.NextFunction,
  ): Promise<void> {
    try {
      res.json(await this._authService.logout(refreshToken));
    } catch (err) {
      next(err);
    }
  }
}
