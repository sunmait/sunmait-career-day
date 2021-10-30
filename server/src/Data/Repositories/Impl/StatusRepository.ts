import { StatusEntity } from '../../Entities';
import { IStatusRepository } from '../IStatusRepository';
import { RepositoryBase } from './RepositoryBase';

export class StatusRepository extends RepositoryBase<StatusEntity> implements IStatusRepository {
  constructor(statusEntity: typeof StatusEntity) {
    super(statusEntity);
  }
}
