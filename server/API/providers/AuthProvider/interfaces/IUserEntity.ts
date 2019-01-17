import { UserRoles } from '../../../../Domain/helpers';

export interface IUserEntity {
  id: string;
  role: UserRoles;
  email: string;
}
