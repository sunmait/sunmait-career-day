import path = require('path');
process.env.NODE_CONFIG_DIR = path.resolve(__dirname, '..', '..', 'config');
import config from 'config';
import {
  ISettingsProvider,
  IDatabaseSettings,
  IEmailCredentials,
  IIdentityServerSettings,
} from './interfaces';

export class SettingsProvider implements ISettingsProvider {
  public getDatabaseSettings(): IDatabaseSettings {
    return config.get<IDatabaseSettings>('database');
  }

  public getEmailCredentials(): IEmailCredentials {
    return config.get<IEmailCredentials>('email');
  }

  public getSecretKey(): string {
    return config.get<string>('secretKey');
  }

  public getHostname(): string {
    return config.get<string>('hostname');
  }

  public getIdentityServerSettings(): IIdentityServerSettings {
    return config.get<IIdentityServerSettings>('identityServer');
  }
}
