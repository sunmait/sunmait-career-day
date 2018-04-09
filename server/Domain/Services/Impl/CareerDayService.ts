import { injectable, inject } from 'inversify';
import { ICareerDayService } from '../ICareerDayService';
import CareerDayEntity from '../../../Data/Entities/CareerDayEntity';
import { ICareerDayRepository } from '../../../Data/Repositories/index';
import ObjectiveEntity from '../../../Data/Entities/ObjectiveEntity';

@injectable()
export class CareerDayService implements ICareerDayService {
  private readonly _careerDayRepository: ICareerDayRepository;

  constructor(@inject('CareerDayRepository') careerDayRepository: ICareerDayRepository) {
    this._careerDayRepository = careerDayRepository;
  }

  public async getCareerDaysWithId(EmployeeId: number): Promise<CareerDayEntity[]> {
    return this._careerDayRepository.findAll({
      where: { EmployeeId },
      order: [['CreatedAt', 'DESC']],
    });
  }

  public async getCurrentCareerDay(EmployeeId: number): Promise<CareerDayEntity> {
    return this._careerDayRepository.findOne({
      where: { EmployeeId, Archived: false },
      include: ObjectiveEntity,
    });
  }

  public async addCareerDay(data: any): Promise<CareerDayEntity> {
    const activeCareerDay = await this._careerDayRepository.findAll({
      where: { EmployeeId: data.EmployeeId, Archived: false },
    });

    // TODO: manager validation
    // id already in data
    if (!activeCareerDay[0]) {
      const careerDay = new CareerDayEntity(data);
      return this._careerDayRepository.create(careerDay);
    }
    throw { status: 403 };
  }

  public async deleteCareerDay(id: number): Promise<void> {
    const careerDay = await this._careerDayRepository.findById(id);

    if (careerDay) {
      if (careerDay.Archived) {
        await this._careerDayRepository.remove({ where: { id } });
      } else {
        throw { status: 403 };
      }
    } else {
      throw { status: 404 };
    }
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
    }
    throw { status: 403 };
  }

  public async updateCareerDayDate(
    id: number,
    date: string,
    employeeId: number,
  ): Promise<CareerDayEntity> {
    const careerDay = await this._careerDayRepository.findById(id);

    if (careerDay && !careerDay.Archived) {
      if (employeeId === careerDay.EmployeeId) {
        careerDay.InterviewDate = new Date(date);

        return this._careerDayRepository.update(careerDay);
      }
      throw { status: 403 };
    } else {
      throw { status: 404 };
    }
  }
}
