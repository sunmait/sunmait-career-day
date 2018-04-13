import CareerDayEntity from '../../Data/Entities/CareerDayEntity';
import ObjectiveEntity from '../../Data/Entities/ObjectiveEntity';
import { IUserDecodedFromToken } from '../helpers/index';

export interface IObjectiveService {
  getObjectivesByCareerDayId(CareerDayId: number, user: IUserDecodedFromToken): Promise<CareerDayEntity>;
  addObjective(data: any, user: IUserDecodedFromToken): Promise<ObjectiveEntity>;
  updateObjectiveManager(
    id: number,
    title: string,
    description: string,
    user: IUserDecodedFromToken,
  ): Promise<ObjectiveEntity>;
  updateObjectiveEmployee(id: number, progress: number, user: IUserDecodedFromToken): Promise<ObjectiveEntity>;
  deleteObjective(id: number, user: IUserDecodedFromToken): Promise<void>;
}
