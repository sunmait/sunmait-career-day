import { IRepository } from './IRepository';
import ManagerEmployeesEntity from '../Entities/ManagerEmployeesEntity';

export interface IManagerEmployeesRepository
  extends IRepository<ManagerEmployeesEntity, string> {
  // specific methods
}
