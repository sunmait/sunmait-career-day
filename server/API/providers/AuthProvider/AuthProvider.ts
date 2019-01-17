import { Principal } from './Principal';
import * as express from 'express';
import { injectable, inject } from 'inversify';
import { interfaces } from 'inversify-express-utils';
import { IIdentityClientProvider } from '../IdentityClientProvider';

@injectable()
export class AuthProvider implements interfaces.AuthProvider {
  @inject('IdentityClientProvider')
  private _identityClientProvider!: IIdentityClientProvider;

  public async getUser(
    req: express.Request,
    _res: express.Response,
    _next: express.NextFunction,
  ): Promise<interfaces.Principal> {
    const authorizationHeader = req.get('Authorization') || '';
    const [type = null, token = null] = authorizationHeader.split(' ');

    if (!type || !token || type !== 'Bearer') {
      throw { status: 401, message: 'jwt expired' };
    }

    const user = await this._identityClientProvider.getUserInfo(token);
    const principal = new Principal(user);
    return principal;
  }
}
