import { UserRoles } from './UserRoles';

export interface IUserEntity {
  id: string;
  role: UserRoles;
  email: string;
}
