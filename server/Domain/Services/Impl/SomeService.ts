import { injectable, inject } from 'inversify';
import { ISomeService } from '../ISomeService';

// import { ISomeRepository } from '../../../Data/Repositories/index';

@injectable()
export class SomeService implements ISomeService {
  // private readonly _someRepository: ISomeRepository;

  /* constructor(@inject('SomeRepository') someRepository: ISomeRepository) {
    this._someRepository = someRepository;
  } */

  public getString(): string {
    return 'some string';
  }
}
