import { InstallerBase } from './InstallerBase';
import { ISomeService } from './../../../Domain/Services/index';
import { SomeService } from './../../../Domain/Services/Impl/index';

export class DomainInstaller extends InstallerBase {
  public install(): void {
    this.container.bind<ISomeService>('SomeService').to(SomeService);
  }
}
