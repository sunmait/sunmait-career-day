export interface IObjectiveService {
  getObjectivesByCareerDayId(CareerDayId: number): Promise<any>;
  addObjective(data: any): Promise<any>;
  updateObjective(id: number, title: string, description: string, progress: number): Promise<any>;
  deleteObjective(id: number): Promise<void>;
}
