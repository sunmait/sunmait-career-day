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
    const careerDay = await this._careerDayRepository.findOne({
      where: { id: CareerDayId },
      include: [{ model: ObjectiveEntity, include: [ProgressObjectiveEntity] }],
    });

    return this.addProgressInCareerDay(careerDay);
  }

  public async addObjective(data: any): Promise<ObjectiveEntity> {
    const objective = new ObjectiveEntity(data);
    const createdObjective = await this._objectiveRepository.create(objective);

    return this.addProgress(createdObjective);
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

    objective.Progress = await this.getSumObjectiveProgress(id);
    if (
      objective &&
      objective.CareerDay &&
      objective.Progress + progress.Progress <= ObjectiveProgress.COMPLETED
    ) {
      const progressObjective = new ProgressObjectiveEntity(progress);
      this._progressObjectiveReository.create(progressObjective);
      if (
        !objective.CareerDay.Archived &&
        objective.CareerDay.EmployeeId === user.id
      ) {

        objective.Progress = await this.getSumObjectiveProgress(id) + progress.Progress;
        if (objective.Progress === ObjectiveProgress.NOT_STARTED) {
          objective.StatusId = ObjectiveStatuses.ACTIVE;
        } else if (objective.Progress === ObjectiveProgress.COMPLETED) {
          objective.StatusId = ObjectiveStatuses.DONE;
        } else {
          objective.StatusId = ObjectiveStatuses.IN_PROGRESS;
        }

        await this._objectiveRepository.update(objective);
        const updatedObjective = await this._objectiveRepository.findOne({
          where: { id },
          include: ProgressObjectiveEntity,
        });

        return (await this.addProgress(updatedObjective))
          .dataValues as ObjectiveEntity;
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

    if (objective && objective.CareerDay
      && objective.Progress !== ObjectiveProgress.COMPLETED) {
      if (
        !objective.CareerDay.Archived &&
        objective.CareerDay.UnitManagerId === user.id
      ) {
        objective.Title = title;
        objective.Description = description;

        await this._objectiveRepository.update(objective);
        const updatedObjective = await this._objectiveRepository.findOne({
          where: { id },
          include: ProgressObjectiveEntity,
        });

        return (await this.addProgress(updatedObjective))
          .dataValues as ObjectiveEntity;
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

  private async getSumObjectiveProgress(id: number): Promise<number> {
    const progressObjectives = await this._progressObjectiveReository.findAll({
      where: { ObjectiveId: id },
    });

    if (progressObjectives) {
      return progressObjectives.reduce(
        (accumulator, progressObjective) => accumulator + progressObjective.Progress,
        0);
    } else {
      throw { status: 404 };
    }
  }

  private async addProgress(objective: ObjectiveEntity): Promise<ObjectiveEntity> {
    objective.dataValues = objective.get({ plain: true });
    objective.dataValues.Progress = await this.getSumObjectiveProgress(objective.id);

    return objective;
  }

  public async addProgressInCareerDay(careerDay: CareerDayEntity): Promise<CareerDayEntity> {
    if (careerDay && careerDay.Objectives) {
      const objectives = await Promise.all(careerDay.Objectives
        .map(async objective => (await this.addProgress(objective))
          .dataValues as ObjectiveEntity,
        ));

      careerDay.dataValues.Objectives = objectives;
      return careerDay.dataValues as CareerDayEntity;
    } else {
      return careerDay;
    }
  }
}
