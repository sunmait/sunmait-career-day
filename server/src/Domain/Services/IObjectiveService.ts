import { IUserEntity } from '../../API/providers';
import { CareerDayEntity, ObjectiveEntity } from '../../Data/Entities';

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
