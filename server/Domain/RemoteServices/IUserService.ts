import CareerDayEntity from '../../Data/Entities/CareerDayEntity';
import { IUserEntity } from '../../API/providers';
import ManagerEmployeesEntity from '../../Data/Entities/ManagerEmployeesEntity';

export interface IUserEntityWithActiveCareerDay extends IUserEntity {
  ActiveCareerDay?: CareerDayEntity;
}

export interface IUserService {
  selectedEmployee(id: IUserEntity['id']): Promise<IUserEntity | null>;
  getAllFreeUsers(id: IUserEntity['id']): Promise<IUserEntity[] | null>;
  updateAssign(
    id: ManagerEmployeesEntity['EmployeeId'],
    managerId: ManagerEmployeesEntity['UnitManagerId'],
  ): Promise<void>;
  getEmployees(
    managerId: IUserEntity['id'],
  ): Promise<IUserEntityWithActiveCareerDay[]>;
}
