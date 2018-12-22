import UserEntity from '../../Data/Entities/UserEntity';
import { IUserDecodedFromToken } from '../helpers/index';
import CareerDayEntity from '../../Data/Entities/CareerDayEntity';

export interface IUserEntityWithActiveCareerDay extends UserEntity {
  ActiveCareerDay: CareerDayEntity;
}

export interface IUserService {
  registerUser(
    FirstName: string,
    LastName: string,
    Email: string,
    Password: string,
  ): Promise<void>;
  verifyEmail(encrtyptedEmail: string): Promise<boolean>;
  selectedEmployee(id: number): Promise<UserEntity>;
  getEmployees(
    manager: IUserDecodedFromToken,
  ): Promise<IUserEntityWithActiveCareerDay[]>;
}
