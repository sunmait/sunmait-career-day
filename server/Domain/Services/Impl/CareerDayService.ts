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

  public async getCareerDaysWithId(EmployeeExternalId: number): Promise<CareerDayEntity[]> {
    return this._careerDayRepository.findAll({
      where: { EmployeeExternalId },
      order: [['CreatedAt', 'DESC']],
    });
  }

  public async getCurrentCareerDay(EmployeeExternalId: number): Promise<CareerDayEntity> {
    const activeDay = await this._careerDayRepository.findOne({
      where: {EmployeeExternalId, Archived: false},
      include: ObjectiveEntity,
    });
    return activeDay;
  }

  public async addCareerDay(data: any): Promise<CareerDayEntity> {
    const activeCareerDay = await this._careerDayRepository.findAll({
      where: { EmployeeExternalId: data.EmployeeExternalId, Archived: false },
    });

    // TODO: manager validation
    // id already in data
    if (!activeCareerDay[0]) {
      const careerDay = new CareerDayEntity(data);
      return this._careerDayRepository.create(careerDay);
    }
    throw ({ status: 403 });
  }

  public async deleteCareerDay(id: number): Promise<void> {
    const careerDay = await this._careerDayRepository.findById(id);

    if (careerDay) {
      if (careerDay.Archived) {
        await this._careerDayRepository.remove({ where: { id } });
      } else {
        throw ({ status: 403 });
      }
    } else {
      throw ({ status: 404 });
    }
  }

  public async archiveCareerDay(id: number, managerId: number): Promise<CareerDayEntity> {
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
    throw ({ status: 403 });
  }

  public async updateCareerDayDate(id: number, date: any, employeeId: number, managerId: number) {
    const careerDay = await this._careerDayRepository.findById(id);

    if (careerDay) {
      if (!careerDay.Archived) {
        if (employeeId === careerDay.EmployeeExternalId) {
          careerDay.InterviewDate = new Date(date);
          return this._careerDayRepository.update(careerDay);
        }
        throw ({ status: 403 });
      }
      throw ({ status: 403 });
    } else {
      throw ({ status: 404 });
    }
  }
}
