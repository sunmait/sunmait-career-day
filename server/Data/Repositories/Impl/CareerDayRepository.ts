import { ICareerDayRepository } from '../ICareerDayRepository';
import CareerDayEntity from '../../Entities/CareerDayEntity';
import { RepositoryBase } from './RepositoryBase';

export class CareerDayRepository extends RepositoryBase<CareerDayEntity>
  implements ICareerDayRepository {
  constructor(careerDayEntity: typeof CareerDayEntity) {
    super(careerDayEntity);
  }
}
