import { UserRoles } from './UserRoles';

export interface IUserDecodedFromToken {
  id: number;
  Role: UserRoles;
  PhotoUrl: string;
  LastName: string;
  FirstName: string;
  Email: string;
  iat: number;
  exp: number;
}
