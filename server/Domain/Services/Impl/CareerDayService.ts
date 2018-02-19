import { injectable, inject } from 'inversify';
import { ICareerDayService } from '../ICareerDayService';
import CareerDayEntity from '../../../Data/Entities/CareerDayEntity';

import { ICareerDayRepository } from '../../../Data/Repositories/index';

@injectable()
export class CareerDayService implements ICareerDayService {
  private readonly _careerDayRepository: ICareerDayRepository;

  constructor(@inject('CareerDayRepository') careerDayRepository: ICareerDayRepository) {
    this._careerDayRepository = careerDayRepository;
  }

  public async getCareerDaysWithId(EmployeeExternalId: string): Promise<any> {
    return this._careerDayRepository.findAll({
      where: { EmployeeExternalId },
    });
  }

  public async addCareerDay(data: any): Promise<any> {
    const activeCareerDay = await this._careerDayRepository.findAll({
      where: { EmployeeExternalId: data.EmployeeExternalId, Archived: false },
    });
    if (!activeCareerDay[0]) {
      const careerDay = new CareerDayEntity(data);
      return this._careerDayRepository.create(careerDay);
    } else {
      throw new Error('The employee already has an active career day');
    }
  }
}
