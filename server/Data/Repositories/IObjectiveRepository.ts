import { IRepository } from './IRepository';
import ObjectiveEntity from '../Entities/ObjectiveEntity';

export interface IObjectiveRepository extends IRepository<ObjectiveEntity, number> {
  // specific methods
}
