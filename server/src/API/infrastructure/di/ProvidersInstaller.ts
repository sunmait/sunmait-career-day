import { InstallerBase } from './InstallerBase';
import {
  ISettingsProvider,
  SettingsProvider,
  IIdentityClientProvider,
  IdentityClientProvider,
} from '../../providers';

export class ProvidersInstaller extends InstallerBase {
  public install(): void {
    this.container
      .bind<ISettingsProvider>('SettingsProvider')
      .toConstantValue(new SettingsProvider());
    this.container
      .bind<IIdentityClientProvider>('IdentityClientProvider')
      .to(IdentityClientProvider)
      .inSingletonScope();
  }
}
