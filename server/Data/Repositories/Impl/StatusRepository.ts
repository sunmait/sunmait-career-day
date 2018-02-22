import {injectable} from 'inversify';
import {IStatusRepository} from '../IStatusRepository';
import StatusEntity from '../../Entities/StatusEntity';
import {RepositoryBase} from './RepositoryBase';

@injectable()
export class StatusRepository extends RepositoryBase<StatusEntity>
  implements IStatusRepository {
  constructor(statusEntity: StatusEntity) {
    super(statusEntity);
  }
}
