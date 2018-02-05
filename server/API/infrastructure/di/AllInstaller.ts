import { InstallerBase, DomainInstaller, DataInstaller } from './index';
import { ISettingsProvider, SettingsProvider } from '../index';

export class AllInstaller extends InstallerBase {
  public install(): void {
    const domainInstaller = new DomainInstaller(this.container);
    const dataInstaller = new DataInstaller(this.container);

    domainInstaller.install();
    dataInstaller.install();

    this.container
      .bind<ISettingsProvider>('SettingsProvider')
      .toConstantValue(new SettingsProvider());
  }
}
