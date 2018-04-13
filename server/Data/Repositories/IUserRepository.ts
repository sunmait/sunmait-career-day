import { IRepository } from './IRepository';
import UserEntity from '../Entities/UserEntity';

export interface IUserRepository extends IRepository<UserEntity> {
  // specific methods
}
