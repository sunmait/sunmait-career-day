import {injectable} from 'inversify';
import {ICareerDayRepository} from '../ICareerDayRepository';
import CareerDayEntity from '../../Entities/CareerDayEntity';
import {RepositoryBase} from './RepositoryBase';

@injectable()
export class CareerDayRepository extends RepositoryBase<CareerDayEntity>
  implements ICareerDayRepository {
  constructor(careerDayEntity: CareerDayEntity) {
    super(careerDayEntity);
  }
}
