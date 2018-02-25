export interface IObjectiveService {
  getObjectivesByCareerDayId(CareerDayId: number): Promise<any>;
  addObjective(data: any): Promise<any>;
}
