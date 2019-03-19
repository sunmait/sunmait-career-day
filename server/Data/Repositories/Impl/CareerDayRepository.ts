import { ICareerDayRepository } from '../ICareerDayRepository';
import CareerDayEntity from '../../Entities/CareerDayEntity';
import { RepositoryBase } from './RepositoryBase';
import { Sequelize } from 'sequelize-typescript';

export class CareerDayRepository extends RepositoryBase<CareerDayEntity>
  implements ICareerDayRepository {
  constructor(careerDayEntity: typeof CareerDayEntity) {
    super(careerDayEntity);
  }

  public async getNearestCareerDay(
    UnitManagerId: string,
  ): Promise<CareerDayEntity[]> {
    const nearestCareerDay = await this.findAll({
      attributes: ['EmployeeId', [Sequelize.fn('min', Sequelize.col('InterviewDate')), 'InterviewDate']],
      where: { UnitManagerId },
      group: ['EmployeeId'],
    });

    return nearestCareerDay;
  }
}
