import { InstallerBase } from './InstallerBase';
import { ISomeService, SomeService } from './../../../Domain/Services/index';

export class DomainInstaller extends InstallerBase {
  public install(): void {
    this.container.bind<ISomeService>('SomeService').to(SomeService);
  }
}
