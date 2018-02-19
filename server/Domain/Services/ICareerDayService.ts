export interface ICareerDayService {
  getCareerDaysWithId(employeeId: string): Promise<any>;
  addCareerDay(data: any): Promise<any>;
}
