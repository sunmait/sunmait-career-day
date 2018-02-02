import { injectable } from 'inversify';
import { ISomeService } from '../ISomeService';

@injectable()
export class SomeService implements ISomeService {
  public getString(): string {
    return 'some string';
  }
}
