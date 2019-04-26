import { IProgressObjectiveRepository } from '../IProgressObjectiveRepository';
import ProgressObjectiveEntity from '../../Entities/ProgressObjectiveEntity';
import { RepositoryBase } from './RepositoryBase';

export class ProgresObjectiveRepository extends RepositoryBase<ProgressObjectiveEntity>
  implements IProgressObjectiveRepository {
  constructor(progressObjectiveEntity: typeof ProgressObjectiveEntity) {
    super(progressObjectiveEntity);
  }
}
