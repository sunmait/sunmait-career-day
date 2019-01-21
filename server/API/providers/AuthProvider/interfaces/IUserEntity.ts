import { UserRoles } from '../../../../Domain/helpers';

export interface IUserEntity {
  id: string;
  Role: UserRoles;
  Email: string;
  FirstName: string;
  LastName: string;
}
