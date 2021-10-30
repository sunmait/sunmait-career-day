import { injectable, inject } from 'inversify';
import { IUserService, IUserEntityWithActiveCareerDay } from '../IUserService';
import { ICareerDayRepository, IManagerEmployeesRepository } from '../../../Data/Repositories';
import { IUserEntity, IIdentityClientProvider } from '../../../API/providers';

@injectable()
export class UserServise implements IUserService {
  constructor(
    @inject('CareerDayRepository')
    private readonly _careerDayRepository: ICareerDayRepository,
    @inject('IdentityClientProvider')
    private readonly _identityClientProvider: IIdentityClientProvider,
    @inject('ManagerEmployeesRepository')
    private readonly _managerEmployeesRepository: IManagerEmployeesRepository,
  ) {}

  public async getEmployees(
    managerId: IUserEntity['id'],
  ): Promise<IUserEntityWithActiveCareerDay[]> {
    const managerEmployees = await this._managerEmployeesRepository.findAll({
      where: { UnitManagerId: managerId },
    });
    const employeesIds = managerEmployees.map((employee) => employee.EmployeeId);

    const users = await this._identityClientProvider.getAllUsers();
    const employees = users.filter((user) => employeesIds.indexOf(user.id) !== -1);

    const employeesCareerDays = await this._careerDayRepository.findAll({
      where: { EmployeeId: { $in: employeesIds }, Archived: false },
    });
    return employees.map((employee) => {
      const activeCareerDay = employeesCareerDays.find(
        (careerDay) => careerDay.EmployeeId === employee.id,
      );
      return { ...employee, ActiveCareerDay: activeCareerDay };
    });
  }

  public async selectedEmployee(id: IUserEntity['id']): Promise<IUserEntity | null> {
    const users = await this._identityClientProvider.getAllUsers();
    return users.find((user) => user.id === id) || null;
  }
}
