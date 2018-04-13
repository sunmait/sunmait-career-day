import { InstallerBase } from './InstallerBase';
import {
  CareerDayRepository,
  ObjectiveRepository,
  StatusRepository,
  UserRepository,
  SessionRepository,
} from '../../../Data/Repositories/Impl/index';
import {
  ICareerDayRepository,
  IObjectiveRepository,
  IStatusRepository,
  IUserRepository,
  ISessionRepository,
} from '../../../Data/Repositories/index';
import CareerDayEntity from '../../../Data/Entities/CareerDayEntity';
import ObjectiveEntity from '../../../Data/Entities/ObjectiveEntity';
import StatusEntity from '../../../Data/Entities/StatusEntity';
import UserEntity from '../../../Data/Entities/UserEntity';
import SessionEntity from '../../../Data/Entities/SessionEntity';

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
      .bind<IUserRepository>('UserRepository')
      .toConstantValue(new UserRepository(UserEntity));
    this.container
      .bind<ISessionRepository>('SessionRepository')
      .toConstantValue(new SessionRepository(SessionEntity));
    this.container
      .bind<DbContext>('DbContext')
      .to(DbContext)
      .inSingletonScope();
  }
}
