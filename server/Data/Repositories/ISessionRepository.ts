import { IRepository } from './IRepository';
import SessionEntity from '../Entities/SessionEntity';

export interface ISessionRepository extends IRepository<SessionEntity> {
  // specific methods
}
