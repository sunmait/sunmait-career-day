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
    next: express.NextFunction,
  ): Promise<interfaces.Principal> {
    try {
      const authorizationHeader = req.get('Authorization') || '';
      const [type = null, token = null] = authorizationHeader.split(' ');

      if (!type || !token || type !== 'Bearer') {
        return new Principal(null as any);
      }

      const user = await this._identityClientProvider.getUserInfo(token);
      const principal = new Principal(user);
      return principal;
    } catch (err: any) {
      next({ status: 401, message: err.message });
      return new Principal(null as any);
    }
  }
}
