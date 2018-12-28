import { injectable, inject } from 'inversify';
import { IUserService, IUserEntityWithActiveCareerDay } from '../IUserService';
import { UserRoles, IUserEntity } from '../../helpers';
import { ICareerDayRepository } from '../../../Data/Repositories';

@injectable()
export class UserServise implements IUserService {
  private readonly _careerDayRepository: ICareerDayRepository;

  constructor(
    @inject('CareerDayRepository') careerDayRepository: ICareerDayRepository,
  ) {
    this._careerDayRepository = careerDayRepository;
  }

  public async getEmployees(
    userId: IUserEntity['id'],
  ): Promise<IUserEntityWithActiveCareerDay[]> {
    // TODO: Change to real request
    const employees: IUserEntity[] = [
      {
        email: 'user0@sunmait.com',
        id: '02d1437c-4c60-4109-9c9a-473bb36e74bb',
        role: 'employee' as UserRoles,
      },
      {
        email: 'user1@sunmait.com',
        id: 'c64e0924-d531-421d-a415-f717ac91fbfa',
        role: 'employee' as UserRoles,
      },
    ];
    const employeesIds = employees.map(employee => employee.id);
    const employeesCareerDays = await this._careerDayRepository.findAll({
      where: { id: { $in: employeesIds }, Archived: false },
    });
    return employees.map(employee => {
      const activeCareerDay = employeesCareerDays.find(
        careerDay => careerDay.EmployeeId === employee.id,
      );
      return { ...employee, ActiveCareerDay: activeCareerDay };
    });
  }

  public async selectedEmployee(_id: IUserEntity['id']): Promise<IUserEntity> {
    return {
      id: 'employee.id',
      role: 'employee',
      email: 'email',
    } as IUserEntity;
  }
}
