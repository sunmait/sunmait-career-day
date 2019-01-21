import CareerDayEntity from '../../Data/Entities/CareerDayEntity';
import { IUserEntity } from '../../API/providers';

export interface IUserEntityWithActiveCareerDay extends IUserEntity {
  ActiveCareerDay?: CareerDayEntity;
}

export interface IUserService {
  selectedEmployee(id: IUserEntity['id']): Promise<IUserEntity | null>;
  getEmployees(
    managerId: IUserEntity['id'],
  ): Promise<IUserEntityWithActiveCareerDay[]>;
}
