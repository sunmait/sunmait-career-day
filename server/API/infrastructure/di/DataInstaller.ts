import { InstallerBase } from './InstallerBase';
import {
  CareerDayRepository,
  ObjectiveRepository,
  StatusRepository,
} from '../../../Data/Repositories/Impl/index';

import {
  ICareerDayRepository,
  IObjectiveRepository,
  IStatusRepository,
} from '../../../Data/Repositories/index';

import { DbContext } from '../../../Data/DbContext';
export class DataInstaller extends InstallerBase {
  public install(): void {
    this.container
      .bind<ICareerDayRepository>('CareerDayRepository')
      .to(CareerDayRepository);
    this.container
      .bind<IObjectiveRepository>('ObjectiveRepository')
      .to(ObjectiveRepository);
    this.container
      .bind<IStatusRepository>('StatusRepository')
      .to(StatusRepository);
    this.container
      .bind<DbContext>('DbContext')
      .to(DbContext)
      .inSingletonScope();
  }
}
