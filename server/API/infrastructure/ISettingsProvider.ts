import { IDatabaseSettings } from './IDatabaseSettings';
import { IEmailCredentials } from './IEmailCredentials';

export interface ISettingsProvider {
  getDatabaseSettings(): IDatabaseSettings;
  getEmailCredentials(): IEmailCredentials;
  getSecretKey(): string;
  getHostname(): string;
}
