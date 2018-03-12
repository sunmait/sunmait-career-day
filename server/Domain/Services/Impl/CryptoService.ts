import { injectable, inject } from 'inversify';
import { ICryptoService } from '../ICryptoService';
import * as CryptoJS from 'crypto-js';
import { ISettingsProvider } from '../../../API/infrastructure/index';
import * as passwordHash from 'password-hash';

@injectable()
export class CryptoService implements ICryptoService {
  private _sectetKey: string;
  constructor(@inject('SettingsProvider') settingsProvider: ISettingsProvider) {
    this._sectetKey = settingsProvider.getSecretKey();
  }

  public encrtyptAES(data) {
    return CryptoJS.AES.encrypt(data, this._sectetKey).toString();
  }

  public decryptAES(data) {
    return CryptoJS.AES.decrypt(data, this._sectetKey).toString(
      CryptoJS.enc.Utf8,
    );
  }

  public passwordHashing(password: string) {
    return passwordHash.generate(password);
  }

  public passwordsVerification(password: string, hashedPassword: string) {
    return passwordHash.verify(password, hashedPassword);
  }
}
