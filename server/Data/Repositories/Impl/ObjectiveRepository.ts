import { IObjectiveRepository } from '../IObjectiveRepository';
import ObjectiveEntity from '../../Entities/ObjectiveEntity';
import { RepositoryBase } from './RepositoryBase';

export class ObjectiveRepository extends RepositoryBase<ObjectiveEntity, number>
  implements IObjectiveRepository {
  constructor(objectiveEntity: typeof ObjectiveEntity) {
    super(objectiveEntity);
  }
}
