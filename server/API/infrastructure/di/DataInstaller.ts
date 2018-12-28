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
import CareerDayEntity from '../../../Data/Entities/CareerDayEntity';
import ObjectiveEntity from '../../../Data/Entities/ObjectiveEntity';
import StatusEntity from '../../../Data/Entities/StatusEntity';

import { DbContext } from '../../../Data/DbContext';

export class DataInstaller extends InstallerBase {
  public install(): void {
    this.container
      .bind<ICareerDayRepository>('CareerDayRepository')
      .toConstantValue(new CareerDayRepository(CareerDayEntity));
    this.container
      .bind<IObjectiveRepository>('ObjectiveRepository')
      .toConstantValue(new ObjectiveRepository(ObjectiveEntity));
    this.container
      .bind<IStatusRepository>('StatusRepository')
      .toConstantValue(new StatusRepository(StatusEntity));
    this.container
      .bind<DbContext>('DbContext')
      .to(DbContext)
      .inSingletonScope();
  }
}
