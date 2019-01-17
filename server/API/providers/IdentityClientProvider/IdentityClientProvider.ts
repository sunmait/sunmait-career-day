import { injectable, inject } from 'inversify';
import { Issuer } from 'openid-client';
import { ISettingsProvider } from '../SettingsProvider';
import { IIdentityClientProvider } from './interfaces';
import * as jwt from 'jsonwebtoken';
import { IUserEntity } from '../AuthProvider/interfaces';

@injectable()
export class IdentityClientProvider implements IIdentityClientProvider {
  private publicKey: Promise<string>;

  constructor(
    @inject('SettingsProvider') private _settingsProvider: ISettingsProvider,
  ) {
    this.publicKey = this.getPublicKey();
  }

  public async getPublicKey(): Promise<string> {
    const { host } = this._settingsProvider.getIdentityServerSettings();
    return Issuer.discover(host)
      .then((issuer: any) => issuer.key())
      .then((key: any) => key.toPEM())
      .catch((err: Error) => {
        console.error(err);
      });
  }

  public async getUserInfo(accessToken: string): Promise<IUserEntity> {
    const key = await this.publicKey;
    const userInfo = jwt.verify(accessToken, key) as IUserEntity;
    return userInfo;
  }
}
