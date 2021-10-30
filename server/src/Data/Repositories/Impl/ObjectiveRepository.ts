import { ObjectiveEntity } from '../../Entities';
import { IObjectiveRepository } from '../IObjectiveRepository';
import { RepositoryBase } from './RepositoryBase';

export class ObjectiveRepository
  extends RepositoryBase<ObjectiveEntity>
  implements IObjectiveRepository
{
  constructor(objectiveEntity: typeof ObjectiveEntity) {
    super(objectiveEntity);
  }
}
