process.env.NODE_CONFIG_DIR = 'API/config'; // TODO: fix path

import { ISettingsProvider } from './ISettingsProvider';
import { IDatabaseSettings } from './IDatabaseSettings';
import * as config from 'config'; // https://github.com/lorenwest/node-config

export class SettingsProvider implements ISettingsProvider {
  public getDatabaseSettings(): IDatabaseSettings {
    return config.get('database');
  }
}
