import { UserRoles } from './UserRoles';

export interface IUserDecodedFromToken {
  id: string;
  role: UserRoles;
}
