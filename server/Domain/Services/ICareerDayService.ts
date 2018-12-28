import CareerDayEntity from '../../Data/Entities/CareerDayEntity';
import { IUserDecodedFromToken } from '../helpers/index';

export interface ICareerDayService {
  getCareerDaysByEmployeeId(
    EmployeeId: string,
    user: IUserDecodedFromToken,
  ): Promise<CareerDayEntity[]>;
  addCareerDay(
    data: any,
    user: IUserDecodedFromToken,
  ): Promise<CareerDayEntity>;
  deleteCareerDay(id: number, user: IUserDecodedFromToken): Promise<void>;
  updateCareerDayDate(
    id: number,
    date: string,
    employeeId: string,
    user: IUserDecodedFromToken,
  ): Promise<CareerDayEntity>;
  archiveCareerDay(
    id: number,
    user: IUserDecodedFromToken,
  ): Promise<CareerDayEntity>;
  getActiveCareerDay(
    EmployeeId: string,
    user: IUserDecodedFromToken,
  ): Promise<CareerDayEntity>;
}
