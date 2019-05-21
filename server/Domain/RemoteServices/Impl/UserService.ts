import { injectable, inject } from 'inversify';
import { IUserService, IUserEntityWithActiveCareerDay } from '../IUserService';
import {
  ICareerDayRepository,
  IManagerEmployeesRepository,
} from '../../../Data/Repositories';
import { IUserEntity, IIdentityClientProvider } from '../../../API/providers';
import ManagerEmployeesEntity from '../../../Data/Entities/ManagerEmployeesEntity';

@injectable()
export class UserServise implements IUserService {
  constructor(
    @inject('CareerDayRepository')
    private readonly _careerDayRepository: ICareerDayRepository,
    @inject('IdentityClientProvider')
    private readonly _identityClientProvider: IIdentityClientProvider,
    @inject('ManagerEmployeesRepository')
    private readonly _managerEmployeesRepository: IManagerEmployeesRepository,
  ) { }

  public async getEmployees(
    managerId: IUserEntity['id'],
  ): Promise<IUserEntityWithActiveCareerDay[]> {
    const managerEmployees = await this._managerEmployeesRepository.findAll({
      where: { UnitManagerId: managerId },
    });
    const employeesIds = managerEmployees.map(employee => employee.EmployeeId);

    const users = await this._identityClientProvider.getAllUsers();
    const employees = users.filter(
      user => employeesIds.indexOf(user.id) !== -1,
    );

    const employeesCareerDays = await this._careerDayRepository.findAll({
      where: { EmployeeId: { $in: employeesIds }, Archived: false },
    });
    return employees.map(employee => {
      const activeCareerDay = employeesCareerDays.find(
        careerDay => careerDay.EmployeeId === employee.id,
      );
      return { ...employee, ActiveCareerDay: activeCareerDay };
    });
  }

  public async selectedEmployee(
    id: IUserEntity['id'],
  ): Promise<IUserEntity | null> {
    const users = await this._identityClientProvider.getAllUsers();
    return users.find(user => user.id === id) || null;
  }

  public async getAllFreeUsers(
    managerId: IUserEntity['id'],
  ): Promise<IUserEntity[]> {
    const users = await this._identityClientProvider.getAllUsers();
    const allUsers = users.filter(user => user.id !== managerId);
    const managerEmployees = await this._managerEmployeesRepository.findAll({
      where: { UnitManagerId: managerId },
    });
    const employeesIds = managerEmployees.map(employee => employee.EmployeeId);
    const commonUsers = allUsers.filter(user => user.Role[0] !== 'manager');
    const freeUsers = commonUsers.map(user => ({
      ...user,
      assigned: employeesIds.includes(user.id)}));
    return freeUsers;
  }

  public async updateManagedUsers(
    employeeId: ManagerEmployeesEntity['EmployeeId'],
    managerId: ManagerEmployeesEntity['UnitManagerId'],
  ): Promise<void> {
    const managerEmployees = await this._managerEmployeesRepository.findOne({
      where: { UnitManagerId: managerId, EmployeeId: employeeId },
    });
    const managerEmployeesEntity = new ManagerEmployeesEntity({
       UnitManagerId: managerId, EmployeeId: employeeId } as ManagerEmployeesEntity);
    (managerEmployees === null)
      ? this._managerEmployeesRepository.create(managerEmployeesEntity)
      : this._managerEmployeesRepository.remove({ where: {UnitManagerId: managerId, EmployeeId: employeeId }});
  }
}
