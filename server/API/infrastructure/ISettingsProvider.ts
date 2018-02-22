import {IDatabaseSettings} from './IDatabaseSettings';

export interface ISettingsProvider {
  getDatabaseSettings(): IDatabaseSettings;
}
