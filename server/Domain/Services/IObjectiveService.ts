import CareerDayEntity from '../../Data/Entities/CareerDayEntity';
import ObjectiveEntity from '../../Data/Entities/ObjectiveEntity';
import { IUserEntity } from '../../API/providers';

export interface IObjectiveService {
  getObjectivesByCareerDayId(CareerDayId: number): Promise<CareerDayEntity>;
  addObjective(data: any): Promise<ObjectiveEntity>;
  updateObjectiveManager(
    id: number,
    title: string,
    description: string,
    user: IUserEntity,
  ): Promise<ObjectiveEntity>;
  updateObjectiveEmployee(
    id: number,
    progress: number,
    user: IUserEntity,
  ): Promise<ObjectiveEntity>;
  deleteObjective(id: number, user: IUserEntity): Promise<void>;
}
