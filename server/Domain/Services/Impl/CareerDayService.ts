import { injectable, inject } from 'inversify';
import { ICareerDayService } from '../ICareerDayService';
import CareerDayEntity from '../../../Data/Entities/CareerDayEntity';
import { ICareerDayRepository } from '../../../Data/Repositories/index';
import ObjectiveEntity from '../../../Data/Entities/ObjectiveEntity';
import ProgressObjectiveEntity from '../../../Data/Entities/ProgressObjectiveEntity';
import { IUserEntity } from '../../../API/providers';
import { INearestCareerDay } from '../../../Data/Interfaces/INearestCareerDay';
import { IIdentityClientProvider } from '../../../API/providers';
import { IObjectiveService } from '../IObjectiveService';

@injectable()
export class CareerDayService implements ICareerDayService {
  private readonly _careerDayRepository: ICareerDayRepository;

  constructor(
    @inject('ObjectiveService')
    private readonly _objectiveService: IObjectiveService,
    @inject('CareerDayRepository') careerDayRepository: ICareerDayRepository,
    @inject('IdentityClientProvider')
    private readonly _identityClientProvider: IIdentityClientProvider,
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

  public async getCareerDayById(id: number): Promise<CareerDayEntity> {
    return this._careerDayRepository.findById(id);
  }

  public async getNearestCareerDays(UnitManagerId: string): Promise<INearestCareerDay[]> {
    const nearestCareerDays = await this._careerDayRepository.getNearestCareerDays(UnitManagerId);
    const users = await this._identityClientProvider.getAllUsers();
    return nearestCareerDays.map(careerDay => {
      const user = users.find(employee => employee.id === careerDay.EmployeeId);
      if (user) {
        return {
          FirstName: user.FirstName,
          LastName: user.LastName,
          EmployeeId: careerDay.EmployeeId,
          InterviewDate: careerDay.InterviewDate,
          Archived: careerDay.Archived,
          id: careerDay.id,
        };
      }
      throw { status: 404 };
    });
  }

  public async getActiveCareerDay(
    EmployeeId: string,
  ): Promise<CareerDayEntity> {
    const careerDay = await this._careerDayRepository.findOne({
      where: { EmployeeId, Archived: false },
      include: [{ model: ObjectiveEntity, include: [ProgressObjectiveEntity] }],
    });

    return this._objectiveService.addProgressInCareerDay(careerDay);
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

      const archivedCareerDay = await this._careerDayRepository.update(careerDay);
      return this._objectiveService.addProgressInCareerDay(archivedCareerDay);
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
