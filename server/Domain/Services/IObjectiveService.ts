import CareerDayEntity from '../../Data/Entities/CareerDayEntity';
import ObjectiveEntity from '../../Data/Entities/ObjectiveEntity';

export interface IObjectiveService {
  getObjectivesByCareerDayId(CareerDayId: number): Promise<CareerDayEntity>;
  addObjective(data: any): Promise<ObjectiveEntity>;
  updateObjectiveManager(id: number, title: string, description: string): Promise<ObjectiveEntity>;
  updateObjectiveEmployee(id: number, progress: number): Promise<ObjectiveEntity>;
  deleteObjective(id: number): Promise<void>;
}
