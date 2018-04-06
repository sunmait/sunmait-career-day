import CareerDayEntity from '../../Data/Entities/CareerDayEntity';

export interface ICareerDayService {
  getCareerDaysWithId(EmployeeId: number): Promise<CareerDayEntity[]>;
  addCareerDay(data: any): Promise<CareerDayEntity>;
  deleteCareerDay(id: number): Promise<void>;
  updateCareerDayDate(id: number, date: string, employeeId: number): Promise<CareerDayEntity>;
  archiveCareerDay(id: number): Promise<CareerDayEntity>;
  getCurrentCareerDay(EmployeeId: number): Promise<CareerDayEntity>;
}
