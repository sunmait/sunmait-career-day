import { ISessionRepository } from '../ISessionRepository';
import SessionEntity from '../../Entities/SessionEntity';
import { RepositoryBase } from './RepositoryBase';

export class SessionRepository extends RepositoryBase<SessionEntity>
  implements ISessionRepository {
  constructor(sessionEntity: SessionEntity) {
    super(sessionEntity);
  }
}
