process.env.NODE_CONFIG_DIR = 'API/config'; // TODO: fix path

import { ISettingsProvider } from './ISettingsProvider';
import { IDatabaseSettings } from './IDatabaseSettings';
import { IEmailCredentials } from './IEmailCredentials';
import * as config from 'config';

export class SettingsProvider implements ISettingsProvider {
  public getDatabaseSettings(): IDatabaseSettings {
    return config.get('database');
  }

  public getEmailCredentials(): IEmailCredentials {
    return config.get('email');
  }

  public getSecretKey(): string {
    return config.get('secretKey');
  }

  public getHostname(): string {
    return config.get('hostname');
  }
}
