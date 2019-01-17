import { IDatabaseSettings } from './IDatabaseSettings';
import { IEmailCredentials } from './IEmailCredentials';
import { IIdentityServerSettings } from './IIdentityServerSettings';

export interface ISettingsProvider {
  getDatabaseSettings(): IDatabaseSettings;
  getEmailCredentials(): IEmailCredentials;
  getSecretKey(): string;
  getHostname(): string;
  getIdentityServerSettings(): IIdentityServerSettings;
}
