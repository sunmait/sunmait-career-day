import { IStatusRepository } from '../IStatusRepository';
import StatusEntity from '../../Entities/StatusEntity';
import { RepositoryBase } from './RepositoryBase';

export class StatusRepository extends RepositoryBase<StatusEntity, number>
  implements IStatusRepository {
  constructor(statusEntity: typeof StatusEntity) {
    super(statusEntity);
  }
}
