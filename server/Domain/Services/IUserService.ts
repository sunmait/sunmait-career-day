import UserEntity from '../../Data/Entities/UserEntity';
import { IUserDecodedFromToken } from '../helpers/index';

export interface IUserService {
  registerUser(FirstName: string, LastName: string, Email: string, Password: string): Promise<void>;
  verifyEmail(encrtyptedEmail: string): Promise<boolean>;
  selectedEmployee(id: number): Promise<UserEntity>;
  getEmployees(manager: IUserDecodedFromToken): Promise<UserEntity[]>;
}
