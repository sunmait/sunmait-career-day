import { IRepository } from './IRepository';
import StatusEntity from '../Entities/StatusEntity';

export interface IStatusRepository extends IRepository<StatusEntity, number> {
  // specific methods
}
