import { IUserEntity } from '../../API/providers';
import { CareerDayEntity } from '../../Data/Entities';

export interface IUserEntityWithActiveCareerDay extends IUserEntity {
  ActiveCareerDay?: CareerDayEntity;
}

export interface IUserService {
  selectedEmployee(id: IUserEntity['id']): Promise<IUserEntity | null>;
  getEmployees(managerId: IUserEntity['id']): Promise<IUserEntityWithActiveCareerDay[]>;
}
