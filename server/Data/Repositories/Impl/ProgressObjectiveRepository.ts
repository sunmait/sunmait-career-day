import { IProgressObjectiveRepository } from '../IProgressObjectiveRepository';
import ProgressObjectiveEntity from '../../Entities/ProgressObjectiveEntity';
import { RepositoryBase } from './RepositoryBase';

export class PprogresObjectiveRepository extends RepositoryBase<ProgressObjectiveEntity>
  implements IProgressObjectiveRepository {
  constructor(progressObjectiveEntity: typeof ProgressObjectiveEntity) {
    super(progressObjectiveEntity);
  }
}
