export interface IObjectiveService {
  getObjectivesByCareerDayId(CareerDayId: number): Promise<any>;
  addObjective(data: any): Promise<any>;
  updateObjectiveManager(id: number, title: string, description: string): Promise<any>;
  updateObjectiveEmployee(id: number, progress: number): Promise<any>;
  deleteObjective(id: number): Promise<void>;
}
