import { ICareerDayRepository } from '../ICareerDayRepository';
import CareerDayEntity from '../../Entities/CareerDayEntity';
import { RepositoryBase } from './RepositoryBase';
import { DbContext } from '../../DbContext';

export class CareerDayRepository extends RepositoryBase<CareerDayEntity, number>
  implements ICareerDayRepository {
  constructor(careerDayEntity: typeof CareerDayEntity, private dbContext: DbContext) {
    super(careerDayEntity);
  }

  public async getNearestCareerDays(
    UnitManagerId: string,
  ): Promise<CareerDayEntity[]> {
    const queryRequest = `SELECT *
    FROM
      (SELECT "EmployeeId",
              min("InterviewDate") AS "InterviewDate"
       FROM "CareerDays"
       WHERE "UnitManagerId" = '${UnitManagerId}'
         AND "Archived" = FALSE
       GROUP BY "EmployeeId") min_dates
    JOIN "CareerDays" AS "careerDay" ON "careerDay"."EmployeeId" = "min_dates"."EmployeeId"
    AND "min_dates"."InterviewDate" = "careerDay"."InterviewDate";`;

    const nearestCareerDays = await this.dbContext.query(queryRequest,
      { model: CareerDayEntity });
    return nearestCareerDays;
  }
}
