import { injectable } from 'inversify';
import { IObjectiveRepository } from '../IObjectiveRepository';
import ObjectiveEntity from '../../Entities/ObjectiveEntity';
import { RepositoryBase } from './RepositoryBase';

@injectable()
export class ObjectiveRepository extends RepositoryBase<ObjectiveEntity>
  implements IObjectiveRepository {
  constructor() {
    super(ObjectiveEntity);
  }
}
