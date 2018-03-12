import {injectable} from 'inversify';
import {IUserRepository} from '../IUserRepository';
import UserEntity from '../../Entities/UserEntity';
import {RepositoryBase} from './RepositoryBase';

@injectable()
export class UserRepository extends RepositoryBase<UserEntity>
  implements IUserRepository {
  constructor(userEntity: UserEntity) {
    super(userEntity);
  }
}
