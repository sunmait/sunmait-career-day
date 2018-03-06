import { injectable, inject } from 'inversify';
import { ICareerDayService } from '../ICareerDayService';
import CareerDayEntity from '../../../Data/Entities/CareerDayEntity';
import { ICareerDayRepository } from '../../../Data/Repositories/index';
import ObjectiveEntity from '../../../Data/Entities/ObjectiveEntity';

@injectable()
export class CareerDayService implements ICareerDayService {
  private readonly _careerDayRepository: ICareerDayRepository;
  constructor(
    @inject('CareerDayRepository') careerDayRepository: ICareerDayRepository,
  ) {
    this._careerDayRepository = careerDayRepository;
  }

  public async getCareerDaysWithId(
    EmployeeExternalId: number,
  ): Promise<CareerDayEntity[]> {
    return this._careerDayRepository.findAll({
      where: { EmployeeExternalId },
      order: [['CreatedAt', 'DESC']],
    });
  }

  public async addCareerDay(data: any): Promise<CareerDayEntity> {
    const activeCareerDay = await this._careerDayRepository.findAll({
      where: { EmployeeExternalId: data.EmployeeExternalId, Archived: false },
    });
    if (!activeCareerDay[0]) {
      const careerDay = new CareerDayEntity(data);
      return this._careerDayRepository.create(careerDay);
    } else {
      throw {
        code: 403,
        massage: 'The employee already has an active Сareer Day.',
      };
    }
  }

  public async deleteCareerDay(id: number): Promise<void> {
    await this._careerDayRepository.remove({ where: { id } });
  }

  public async archiveCareerDay(id: number): Promise<CareerDayEntity> {
    const careerDay = (await this._careerDayRepository.findAll({
      where: { id },
      include: ObjectiveEntity,
    }))[0];
    if (careerDay.InterviewDate.getTime() - Date.now() <= 0) {
      careerDay.Archived = true;
      careerDay.Objectives.forEach(item => {
        item.StatusId = 3;
        return item;
      });
      return this._careerDayRepository.update(careerDay);
    } else {
      throw {
        code: 403,
        massage: 'Can be archived only after datetime of Career Day.',
      };
    }
  }
  public async updateCareerDayDate(id: number, date: any) {
    const careerDay = await this._careerDayRepository.findById(id);
    if (!careerDay.Archived) {
      careerDay.InterviewDate = new Date(date);
      return this._careerDayRepository.update(careerDay);
    } else {
      throw {
        code: 403,
        massage: 'No one can edit archived Career Day.',
      };
    }
  }
}
