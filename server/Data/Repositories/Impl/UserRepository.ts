import { IUserRepository } from '../IUserRepository';
import UserEntity from '../../Entities/UserEntity';
import { RepositoryBase } from './RepositoryBase';

export class UserRepository extends RepositoryBase<UserEntity>
  implements IUserRepository {
  constructor(userEntity: UserEntity) {
    super(userEntity);
  }
}
