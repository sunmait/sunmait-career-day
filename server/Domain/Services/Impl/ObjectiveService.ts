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

  public async getObjectivesByCareerDayId(
    CareerDayId: number,
  ): Promise<CareerDayEntity[]> {
    return this._careerDayRepository.find({
      where: { id: CareerDayId },
      include: ObjectiveEntity,
    });
  }

  public async addObjective(data: any): Promise<ObjectiveEntity> {
    const objective = new ObjectiveEntity(data);

    return this._objectiveRepository.create(objective);
  }
}
