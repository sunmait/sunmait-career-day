import { injectable, inject } from 'inversify';
import { ICareerDayService } from '../ICareerDayService';
import CareerDayEntity from '../../../Data/Entities/CareerDayEntity';
import { ICareerDayRepository } from '../../../Data/Repositories/index';
import ObjectiveEntity from '../../../Data/Entities/ObjectiveEntity';
import { IUserEntity } from '../../../API/providers';

@injectable()
export class CareerDayService implements ICareerDayService {
  private readonly _careerDayRepository: ICareerDayRepository;

  constructor(
    @inject('CareerDayRepository') careerDayRepository: ICareerDayRepository,
  ) {
    this._careerDayRepository = careerDayRepository;
  }

  public async getCareerDaysByEmployeeId(
    EmployeeId: string,
  ): Promise<CareerDayEntity[]> {
    return this._careerDayRepository.findAll({
      where: { EmployeeId },
      order: [['CreatedAt', 'DESC']],
    });
  }

  public async getNearestCareerDay(
  ): Promise<CareerDayEntity[]> {
    const allCareerDay = await this._careerDayRepository.findAll({
      where: {},
    });
    const nearestCareerDay = allCareerDay.filter(careerDay =>
      allCareerDay.every(selfCareerDay =>
        !(careerDay.EmployeeId ===
          selfCareerDay.EmployeeId &&
          careerDay.InterviewDate > selfCareerDay.InterviewDate),
      ),
    );

    return nearestCareerDay;
  }

  public async getCareerDayById(id: number): Promise<CareerDayEntity> {
    return this._careerDayRepository.findById(id);
  }

  public async getActiveCareerDay(
    EmployeeId: string,
  ): Promise<CareerDayEntity> {
    return this._careerDayRepository.findOne({
      where: { EmployeeId, Archived: false },
      include: ObjectiveEntity,
    });
  }

  public async addCareerDay(
    data: Partial<CareerDayEntity>,
  ): Promise<CareerDayEntity> {
    const careerDay = new CareerDayEntity(data);

    return this._careerDayRepository.create(careerDay);
  }

  public async deleteCareerDay(id: number): Promise<boolean> {
    return this._careerDayRepository.remove({ where: { id } });
  }

  public async archiveCareerDay(
    id: number,
    user: IUserEntity,
  ): Promise<CareerDayEntity> {
    const careerDay = await this._careerDayRepository.findOne({
      where: { id },
      include: ObjectiveEntity,
    });

    if (
      careerDay &&
      careerDay.UnitManagerId === user.id &&
      careerDay.InterviewDate.getTime() - Date.now() <= 0
    ) {
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
    employeeId: string,
    user: IUserEntity,
  ): Promise<CareerDayEntity> {
    const careerDay = await this._careerDayRepository.findById(id);

    if (!careerDay) {
      throw { status: 404 };
    }

    if (
      careerDay.UnitManagerId !== user.id ||
      careerDay.Archived ||
      employeeId !== careerDay.EmployeeId
    ) {
      throw { status: 403 };
    }

    careerDay.InterviewDate = new Date(date);
    return this._careerDayRepository.update(careerDay);
  }
}
