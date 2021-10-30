import { CareerDayEntity } from '../Entities';
import { IRepository } from './IRepository';

export interface ICareerDayRepository extends IRepository<CareerDayEntity> {
  // specific methods
  getNearestCareerDays(unitManagerId: string): Promise<CareerDayEntity[]>;
}
