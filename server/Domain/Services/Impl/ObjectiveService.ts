import {injectable, inject} from 'inversify';
import {IObjectiveService} from '../IObjectiveService';
import ObjectiveEntity from '../../../Data/Entities/ObjectiveEntity';

import {IObjectiveRepository} from '../../../Data/Repositories/index';

@injectable()
export class ObjectiveService implements IObjectiveService {
  private readonly _objectiveRepository: IObjectiveRepository;

  constructor(@inject('ObjectiveRepository') objectiveRepository: IObjectiveRepository) {
    this._objectiveRepository = objectiveRepository;
  }

  public async getObjectivesById(CareerDayId: number): Promise<ObjectiveEntity[]> {
    return this._objectiveRepository.findAll({
      where: {CareerDayId},
    });
  }

  public async addObjective(data: any): Promise<ObjectiveEntity> {
    const objective = new ObjectiveEntity(data);

    return this._objectiveRepository.create(objective);
  }
}
