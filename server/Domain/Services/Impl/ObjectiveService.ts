import { injectable, inject } from 'inversify';
import { IObjectiveService } from '../IObjectiveService';
import ObjectiveEntity from '../../../Data/Entities/ObjectiveEntity';
import CareerDayEntity from '../../../Data/Entities/CareerDayEntity';
import ApplicationError from './ApplicationError';

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

    if (!careerDay.Archived) {
      if (data.EmployeeExternalId === careerDay.EmployeeExternalId
        && data.UnitManagerExternalId === careerDay.UnitManagerExternalId) {
        const objective = new ObjectiveEntity(data);

        return this._objectiveRepository.create(objective);
      }
      throw (new ApplicationError('You are  not manager of this employee.', 403));
    }
    throw (new ApplicationError('No one can add objective in which Career Day was archived.', 403));
  }

  public async updateObjective(id: number, title: string, description: string) {
    const objective = await this._objectiveRepository.findById(id);
    const careerDay = await this._careerDayRepository.findById(objective.CareerDayId);

    if (!careerDay.Archived) {
      objective.Title = title;
      objective.Description = description;

      return this._objectiveRepository.update(objective);
    }
    throw (new ApplicationError('No one can edit objective in which Career Day was archived.', 403));
  }

  public async deleteObjective(id: number): Promise<void> {
    const careerDay = await this._careerDayRepository.findById(id);

    if (!careerDay.Archived) {
      await this._objectiveRepository.remove({ where: { id } });
    } else {
      throw (new ApplicationError('No one can delete objective in which Career Day was archived.', 403));
    }
  }
}
