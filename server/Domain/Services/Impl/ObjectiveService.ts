import { injectable, inject } from 'inversify';
import { IObjectiveService } from '../IObjectiveService';
import ObjectiveEntity from '../../../Data/Entities/ObjectiveEntity';
import CareerDayEntity from '../../../Data/Entities/CareerDayEntity';
import {
  IObjectiveRepository,
  ICareerDayRepository,
  IProgressObjectiveRepository,
} from '../../../Data/Repositories';
import { ObjectiveProgress, ObjectiveStatuses } from '../../helpers';
import { IUserEntity } from '../../../API/providers';
import { IProgressObjective } from '../../../Data/Interfaces/IProgressObjective';
import ProgressObjectiveEntity from '../../../Data/Entities/ProgressObjectiveEntity';

@injectable()
export class ObjectiveService implements IObjectiveService {
  private readonly _objectiveRepository: IObjectiveRepository;
  private readonly _careerDayRepository: ICareerDayRepository;
  private readonly _progressObjectiveReository: IProgressObjectiveRepository;
  constructor(
    @inject('ObjectiveRepository') objectiveRepository: IObjectiveRepository,
    @inject('CareerDayRepository') careerDayRepository: ICareerDayRepository,
    @inject('ProgressObjectiveRepository') progressObjectiveReository: IProgressObjectiveRepository,
  ) {
    this._objectiveRepository = objectiveRepository;
    this._careerDayRepository = careerDayRepository;
    this._progressObjectiveReository = progressObjectiveReository;
  }

  public async getObjectivesByCareerDayId(
    CareerDayId: number,
  ): Promise<CareerDayEntity> {
    return this._careerDayRepository.findOne({
      where: { id: CareerDayId },
      include: [{ model: ObjectiveEntity, include: [ProgressObjectiveEntity] } ],
    });
  }

  public async addObjective(data: any): Promise<ObjectiveEntity> {
    const objective = new ObjectiveEntity(data);

    return this._objectiveRepository.create(objective);
  }

  public async updateObjectiveEmployee(
    id: number,
    progress: IProgressObjective,
    user: IUserEntity,
  ): Promise<ObjectiveEntity> {
    const objective = await this._objectiveRepository.findOne({
      where: { id },
      include: CareerDayEntity,
    });

    if (objective && objective.CareerDay) {
      const progressObjective = new ProgressObjectiveEntity(progress);
      this._progressObjectiveReository.create(progressObjective);
      if (
        !objective.CareerDay.Archived &&
        objective.CareerDay.EmployeeId === user.id
      ) {
        objective.Progress += progress.Progress;

        if (objective.Progress === ObjectiveProgress.NOT_STARTED) {
          objective.StatusId = ObjectiveStatuses.ACTIVE;
        } else if (objective.Progress === ObjectiveProgress.COMPLETED) {
          objective.StatusId = ObjectiveStatuses.DONE;
        } else {
          objective.StatusId = ObjectiveStatuses.IN_PROGRESS;
        }

        await this._objectiveRepository.update(objective);
        return this._objectiveRepository.findOne({
          where: { id },
          include: ProgressObjectiveEntity,
        });
      } else {
        throw { status: 403 };
      }
    } else {
      throw { status: 404 };
    }
  }

  public async updateObjectiveManager(
    id: number,
    title: string,
    description: string,
    user: IUserEntity,
  ): Promise<ObjectiveEntity> {
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

        await this._objectiveRepository.update(objective);
        return this._objectiveRepository.findOne({
          where: { id },
          include: ProgressObjectiveEntity,
        });
      } else {
        throw { status: 403 };
      }
    } else {
      throw { status: 404 };
    }
  }

  public async deleteObjective(id: number, user: IUserEntity): Promise<void> {
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
  }
}
