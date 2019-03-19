import { IRepository } from './IRepository';
import CareerDayEntity from '../Entities/CareerDayEntity';

export interface ICareerDayRepository extends IRepository<CareerDayEntity> {
  // specific methods
  getNearestCareerDay(unitManagerId: string): Promise<CareerDayEntity[]>;
}
