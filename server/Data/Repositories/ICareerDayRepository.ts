import { IRepository } from './IRepository';
import CareerDayEntity from '../Entities/CareerDayEntity';

export interface ICareerDayRepository extends IRepository<CareerDayEntity> {
  // specific methods
  getNearestCareerDays(unitManagerId: string): Promise<CareerDayEntity[]>;
}
