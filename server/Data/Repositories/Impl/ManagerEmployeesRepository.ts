import { IManagerEmployeesRepository } from '../';
import ManagerEmployeesEntity from '../../Entities/ManagerEmployeesEntity';
import { RepositoryBase } from './RepositoryBase';

export class ManagerEmployeesRepository
  extends RepositoryBase<ManagerEmployeesEntity, string>
  implements IManagerEmployeesRepository {
  constructor(managerEmployeesEntity: typeof ManagerEmployeesEntity) {
    super(managerEmployeesEntity);
  }
}
