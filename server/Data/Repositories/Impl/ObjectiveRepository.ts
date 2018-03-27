import { IObjectiveRepository } from '../IObjectiveRepository';
import ObjectiveEntity from '../../Entities/ObjectiveEntity';
import { RepositoryBase } from './RepositoryBase';

export class ObjectiveRepository extends RepositoryBase<ObjectiveEntity>
  implements IObjectiveRepository {
  constructor(objectiveEntity: ObjectiveEntity) {
    super(objectiveEntity);
  }
}
