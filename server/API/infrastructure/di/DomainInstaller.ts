import { InstallerBase } from './InstallerBase';
import {
  ICareerDayService,
  IObjectiveService,
} from './../../../Domain/Services/index';
import {
  CareerDayService,
  ObjectiveService,
} from './../../../Domain/Services/Impl/index';

export class DomainInstaller extends InstallerBase {
  public install(): void {
    this.container
      .bind<ICareerDayService>('CareerDayService')
      .to(CareerDayService);
    this.container
      .bind<IObjectiveService>('ObjectiveService')
      .to(ObjectiveService);
  }
}
