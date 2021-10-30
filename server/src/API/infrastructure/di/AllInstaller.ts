import { InstallerBase, DomainInstaller, DataInstaller, ProvidersInstaller } from '.';

export class AllInstaller extends InstallerBase {
  public install(): void {
    const domainInstaller = new DomainInstaller(this.container);
    const dataInstaller = new DataInstaller(this.container);
    const providersInstaller = new ProvidersInstaller(this.container);

    domainInstaller.install();
    providersInstaller.install();
    dataInstaller.install();
  }
}
