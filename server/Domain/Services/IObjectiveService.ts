export interface IObjectiveService {
  getObjectivesById(CareerDayId: number): Promise<any>;
  addObjective(data: any): Promise<any>;
}
