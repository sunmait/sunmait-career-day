import { InstallerBase } from './InstallerBase';
import {
  CareerDayRepository,
  ObjectiveRepository,
  StatusRepository,
  ManagerEmployeesRepository,
} from '../../../Data/Repositories/Impl';
import {
  ICareerDayRepository,
  IObjectiveRepository,
  IStatusRepository,
  IManagerEmployeesRepository,
} from '../../../Data/Repositories';
import CareerDayEntity from '../../../Data/Entities/CareerDayEntity';
import ObjectiveEntity from '../../../Data/Entities/ObjectiveEntity';
import StatusEntity from '../../../Data/Entities/StatusEntity';
import ManagerEmployeesEntity from '../../../Data/Entities/ManagerEmployeesEntity';

import { DbContext } from '../../../Data/DbContext';

export class DataInstaller extends InstallerBase {
  public install(): void {
    this.container
      .bind<DbContext>('DbContext')
      .to(DbContext)
      .inSingletonScope();
    this.container
      .bind<ICareerDayRepository>('CareerDayRepository')
      .toConstantValue(new CareerDayRepository(CareerDayEntity, this.container.get<DbContext>('DbContext')));
    this.container
      .bind<IObjectiveRepository>('ObjectiveRepository')
      .toConstantValue(new ObjectiveRepository(ObjectiveEntity));
    this.container
      .bind<IStatusRepository>('StatusRepository')
      .toConstantValue(new StatusRepository(StatusEntity));
    this.container
      .bind<IManagerEmployeesRepository>('ManagerEmployeesRepository')
      .toConstantValue(new ManagerEmployeesRepository(ManagerEmployeesEntity));
  }
}
