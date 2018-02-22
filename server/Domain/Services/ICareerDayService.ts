export interface ICareerDayService {
  getCareerDaysWithId(employeeId: number): Promise<any>;
  addCareerDay(data: any): Promise<any>;
  deleteCareerDay(id: number): Promise<any>;
  updateCareerDayDate(id: number, date: any): Promise<any>;
  archiveCareerDay(id: number): Promise<any>;
}
