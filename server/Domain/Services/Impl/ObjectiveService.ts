import { injectable, inject } from 'inversify';
import { IObjectiveService } from '../IObjectiveService';
import ObjectiveEntity from '../../../Data/Entities/ObjectiveEntity';
import CareerDayEntity from '../../../Data/Entities/CareerDayEntity';
import {
  IObjectiveRepository,
  ICareerDayRepository,
} from '../../../Data/Repositories/index';
import {
  IUserDecodedFromToken,
  ObjectiveProgress,
  ObjectiveStatuses,
  UserRoles,
} from '../../helpers/index';

@injectable()
export class ObjectiveService implements IObjectiveService {
  private readonly _objectiveRepository: IObjectiveRepository;
  private readonly _careerDayRepository: ICareerDayRepository;

  constructor(
    @inject('ObjectiveRepository') objectiveRepository: IObjectiveRepository,
    @inject('CareerDayRepository') careerDayRepository: ICareerDayRepository,
  ) {
    this._objectiveRepository = objectiveRepository;
    this._careerDayRepository = careerDayRepository;
  }

  public async getObjectivesByCareerDayId(
    CareerDayId: number,
    user: IUserDecodedFromToken,
  ): Promise<CareerDayEntity> {
    if (user.role === UserRoles.MANAGER) {
      const careerDay = await this._careerDayRepository.findOne({
        where: { id: CareerDayId },
        include: ObjectiveEntity,
      });
      if (careerDay) {
        if (careerDay.UnitManagerId === user.id) {
          return careerDay;
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

  public async addObjective(
    data: any,
    user: IUserDecodedFromToken,
  ): Promise<ObjectiveEntity> {
    if (user.role === UserRoles.MANAGER && user.id === data.UnitManagerId) {
      const careerDay = await this._careerDayRepository.findById(
        data.CareerDayId,
      );

      if (careerDay) {
        if (
          !careerDay.Archived &&
          data.EmployeeId === careerDay.EmployeeId &&
          user.id === careerDay.UnitManagerId
        ) {
          const objective = new ObjectiveEntity(data);

          return this._objectiveRepository.create(objective);
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

  public async updateObjectiveEmployee(
    id: number,
    progress: number,
    user: IUserDecodedFromToken,
  ): Promise<ObjectiveEntity> {
    if (user.role === UserRoles.EMPLOYEE) {
      const objective = await this._objectiveRepository.findOne({
        where: { id },
        include: CareerDayEntity,
      });

      if (objective && objective.CareerDay) {
        if (
          !objective.CareerDay.Archived &&
          objective.CareerDay.EmployeeId === user.id
        ) {
          objective.Progress = progress;

          if (objective.Progress === ObjectiveProgress.NOT_STARTED) {
            objective.StatusId = ObjectiveStatuses.ACTIVE;
          } else if (objective.Progress === ObjectiveProgress.COMPLETED) {
            objective.StatusId = ObjectiveStatuses.DONE;
          } else {
            objective.StatusId = ObjectiveStatuses.IN_PROGRESS;
          }

          return this._objectiveRepository.update(objective);
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

  public async updateObjectiveManager(
    id: number,
    title: string,
    description: string,
    user: IUserDecodedFromToken,
  ): Promise<ObjectiveEntity> {
    if (user.role === UserRoles.MANAGER) {
      const objective = await this._objectiveRepository.findOne({
        where: { id },
        include: CareerDayEntity,
      });

      if (objective && objective.CareerDay) {
        if (
          !objective.CareerDay.Archived &&
          objective.CareerDay.UnitManagerId === user.id
        ) {
          objective.Title = title;
          objective.Description = description;

          return this._objectiveRepository.update(objective);
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

  public async deleteObjective(
    id: number,
    user: IUserDecodedFromToken,
  ): Promise<void> {
    if (user.role === UserRoles.MANAGER) {
      const objective = await this._objectiveRepository.findOne({
        where: { id },
        include: CareerDayEntity,
      });

      if (objective && objective.CareerDay) {
        if (
          !objective.CareerDay.Archived &&
          objective.CareerDay.UnitManagerId === user.id
        ) {
          await this._objectiveRepository.remove({ where: { id } });
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
}
