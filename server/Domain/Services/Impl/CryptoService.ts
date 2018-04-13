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

  public encrtyptAES(data: string): string {
    return CryptoJS.AES.encrypt(data, this._sectetKey).toString();
  }

  public decryptAES(data: string): string {
    return CryptoJS.AES.decrypt(data, this._sectetKey).toString(CryptoJS.enc.Utf8);
  }

  public passwordHashing(password: string): string {
    return passwordHash.generate(password);
  }

  public passwordsVerification(password: string, hashedPassword: string): boolean {
    return passwordHash.verify(password, hashedPassword);
  }

  public sha256Hashing(str: string): string {
    return CryptoJS.SHA256(str, this._sectetKey).toString();
  }
}
