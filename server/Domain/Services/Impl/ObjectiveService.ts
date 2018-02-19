import { injectable, inject } from 'inversify';
import { IObjectiveService } from '../IObjectiveService';

import { IObjectiveRepository } from '../../../Data/Repositories/index';

@injectable()
export class ObjectiveService implements IObjectiveService {
  private readonly _objectiveRepository: IObjectiveRepository;

  constructor(@inject('ObjectiveRepository') objectiveRepository: IObjectiveRepository) {
    this._objectiveRepository = objectiveRepository;
  }
}
