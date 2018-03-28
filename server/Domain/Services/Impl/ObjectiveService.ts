import { injectable, inject } from 'inversify';
import { IObjectiveService } from '../IObjectiveService';
import ObjectiveEntity from '../../../Data/Entities/ObjectiveEntity';
import CareerDayEntity from '../../../Data/Entities/CareerDayEntity';

import {
  IObjectiveRepository,
  ICareerDayRepository,
} from '../../../Data/Repositories/index';

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

  public async getObjectivesByCareerDayId(CareerDayId: number): Promise<CareerDayEntity> {
    return this._careerDayRepository.findOne({
      where: { id: CareerDayId },
      include: ObjectiveEntity,
    });
  }

  public async addObjective(data: any): Promise<ObjectiveEntity> {
    const careerDay = await this._careerDayRepository.findById(data.CareerDayId);

    if (careerDay) {
      if (!careerDay.Archived) {
        if (data.EmployeeExternalId === careerDay.EmployeeExternalId
          && data.UnitManagerExternalId === careerDay.UnitManagerExternalId) {
          const objective = new ObjectiveEntity(data);

          return this._objectiveRepository.create(objective);
        }
        throw ({ status: 403 });
      }
      throw ({ status: 403 });
    }
    throw ({ status: 404 });
  }

  public async updateObjectiveEmployee(id: number, progress: number) {
    const objective = await this._objectiveRepository.findOne({
      where: { id },
      include: CareerDayEntity,
    });

    // TODO: can edit only init manager

    if (objective && objective.CareerDay) {
      if (!objective.CareerDay.Archived) {
        objective.Progress = progress;

        return this._objectiveRepository.update(objective);
      }
      throw ({ status: 403 });
    } else {
      throw ({ status: 404 });
    }
  }

  public async updateObjectiveManager(id: number, title: string, description: string) {
    const objective = await this._objectiveRepository.findOne({
      where: { id },
      include: CareerDayEntity,
    });

    // TODO: can edit only init manager

    if (objective && objective.CareerDay) {
      if (!objective.CareerDay.Archived) {
        objective.Title = title;
        objective.Description = description;

        return this._objectiveRepository.update(objective);
      }
      throw ({ status: 403 });
    } else {
      throw ({ status: 404 });
    }
  }

  public async deleteObjective(id: number): Promise<void> {
    const objective = await this._objectiveRepository.findOne({
      where: { id },
      include: CareerDayEntity,
    });

    // TODO: can delete only init manager

    if (objective.CareerDay) {
      if (!objective.CareerDay.Archived) {
        await this._objectiveRepository.remove({ where: { id } });
      } else {
        throw ({ status: 403 });
      }
    } else {
      throw({ status: 404 });
    }
  }
}
