import { injectable, inject } from 'inversify';
import { ICareerDayService } from '../ICareerDayService';
import CareerDayEntity from '../../../Data/Entities/CareerDayEntity';
import { ICareerDayRepository } from '../../../Data/Repositories/index';
import ObjectiveEntity from '../../../Data/Entities/ObjectiveEntity';
import { IUserDecodedFromToken, UserRoles } from '../../helpers/index';

@injectable()
export class CareerDayService implements ICareerDayService {
  private readonly _careerDayRepository: ICareerDayRepository;

  constructor(@inject('CareerDayRepository') careerDayRepository: ICareerDayRepository) {
    this._careerDayRepository = careerDayRepository;
  }

  public async getCareerDaysByEmployeeId(EmployeeId: number, user: IUserDecodedFromToken): Promise<CareerDayEntity[]> {
    if (user.Role === UserRoles.MANAGER) {
      return this._careerDayRepository.findAll({
        where: { EmployeeId },
        order: [['CreatedAt', 'DESC']],
      });
    } else {
      throw { status: 403 };
    }
  }

  public async getActiveDays(): Promise<CareerDayEntity[]> {
    return this._careerDayRepository.findAll({
      where: { Archived: false },
    });
  }

  public async getActiveCareerDay(EmployeeId: string, user: IUserDecodedFromToken): Promise<CareerDayEntity> {
    if (user.Role === UserRoles.EMPLOYEE && user.id.toString(10) === EmployeeId) {
      return this._careerDayRepository.findOne({
        where: { EmployeeId, Archived: false },
        include: ObjectiveEntity,
      });
    } else {
      throw { status: 403 };
    }
  }

  public async addCareerDay(data: any, user: IUserDecodedFromToken): Promise<CareerDayEntity> {
    if (user.Role === UserRoles.MANAGER && user.id === data.UnitManagerId) {
      const activeCareerDay = await this._careerDayRepository.findAll({
        where: { EmployeeId: data.EmployeeId, Archived: false },
      });

      if (!activeCareerDay[0]) {
        const careerDay = new CareerDayEntity(data);

        return this._careerDayRepository.create(careerDay);
      } else {
        throw { status: 403 };
      }
    } else {
      throw { status: 403 };
    }
  }

  public async deleteCareerDay(id: number, user: IUserDecodedFromToken): Promise<void> {
    if (user.Role === UserRoles.MANAGER) {
      const careerDay = await this._careerDayRepository.findById(id);

      if (careerDay && careerDay.UnitManagerId === user.id) {
        if (careerDay.Archived) {
          await this._careerDayRepository.remove({ where: { id } });
        } else {
          throw { status: 403 };
        }
      } else {
        throw { status: 404 };
      }
    } else {
      throw { status: 403 };
    }
  }

  public async archiveCareerDay(id: number, user: IUserDecodedFromToken): Promise<CareerDayEntity> {
    if (user.Role === UserRoles.MANAGER) {
      const careerDay = (await this._careerDayRepository.findAll({
        where: { id },
        include: ObjectiveEntity,
      }))[0];

      if (careerDay && careerDay.UnitManagerId === user.id && careerDay.InterviewDate.getTime() - Date.now() <= 0) {
        careerDay.Archived = true;
        careerDay.Objectives.forEach(item => {
          item.StatusId = 3;
          return item;
        });

        return this._careerDayRepository.update(careerDay);
      }
      throw { status: 403 };
    } else {
      throw { status: 403 };
    }
  }

  public async updateCareerDayDate(
    id: number,
    date: string,
    employeeId: number,
    user: IUserDecodedFromToken,
  ): Promise<CareerDayEntity> {
    if (user.Role === UserRoles.MANAGER) {
      const careerDay = await this._careerDayRepository.findById(id);

      if (careerDay && careerDay.UnitManagerId === user.id && !careerDay.Archived) {
        if (employeeId === careerDay.EmployeeId) {
          careerDay.InterviewDate = new Date(date);

          return this._careerDayRepository.update(careerDay);
        }
        throw { status: 403 };
      } else {
        throw { status: 404 };
      }
    } else {
      throw { status: 403 };
    }
  }
}
