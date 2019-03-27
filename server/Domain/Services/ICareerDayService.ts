import CareerDayEntity from '../../Data/Entities/CareerDayEntity';
import { IUserEntity } from '../../API/providers';
import { INearestCareerDay } from '../../Data/Interfaces/INearestCareerDay';

export interface ICareerDayService {
  getCareerDaysByEmployeeId(EmployeeId: string): Promise<CareerDayEntity[]>;
  addCareerDay(data: Partial<CareerDayEntity>): Promise<CareerDayEntity>;
  deleteCareerDay(id: number): Promise<boolean>;
  updateCareerDayDate(
    id: number,
    date: string,
    employeeId: string,
    user: IUserEntity,
  ): Promise<CareerDayEntity>;
  archiveCareerDay(id: number, user: IUserEntity): Promise<CareerDayEntity>;
  getActiveCareerDay(EmployeeId: string): Promise<CareerDayEntity>;
  getCareerDayById(id: number): Promise<CareerDayEntity>;
  getNearestCareerDays(UnitManagerId: string): Promise<INearestCareerDay[]>;
}
