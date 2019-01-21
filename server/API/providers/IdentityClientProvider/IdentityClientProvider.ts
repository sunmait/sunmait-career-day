import { injectable, inject } from 'inversify';
import { Issuer } from 'openid-client';
import { ISettingsProvider } from '../SettingsProvider';
import { IIdentityClientProvider } from './interfaces';
import * as jwt from 'jsonwebtoken';
import { IUserEntity } from '../AuthProvider/interfaces';

@injectable()
export class IdentityClientProvider implements IIdentityClientProvider {
  private ssoIssuer: Promise<any>;

  constructor(
    @inject('SettingsProvider') private _settingsProvider: ISettingsProvider,
  ) {
    this.ssoIssuer = this.getSsoIssuer();
  }

  private async getSsoIssuer(): Promise<any> {
    try {
      const { host } = this._settingsProvider.getIdentityServerSettings();
      return await Issuer.discover(host);
    } catch (err) {
      console.error(err);
    }
  }

  public async getAllUsers(): Promise<IUserEntity[]> {
    const { host } = this._settingsProvider.getIdentityServerSettings();
    const issuer = await this.ssoIssuer;
    const response = await issuer.httpClient.get(`${host}/api/users`, {
      json: true,
    });
    return response.body.map((user: any) => ({
      id: user.id,
      LastName: user.lastName,
      FirstName: user.firstName,
    }));
  }

  private async getPublicKey(): Promise<string> {
    const issuer = await this.ssoIssuer;
    const key = await issuer.key();
    return key.toPEM();
  }

  public async getUserInfo(accessToken: string): Promise<IUserEntity> {
    const key = await this.getPublicKey();
    const userInfo = jwt.verify(accessToken, key) as any;
    return {
      id: userInfo.id,
      Role: userInfo.role,
      Email: userInfo.email,
      LastName: userInfo.family_name,
      FirstName: userInfo.given_name,
    };
  }
}
