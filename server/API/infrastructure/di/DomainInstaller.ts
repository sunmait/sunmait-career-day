import { InstallerBase } from './InstallerBase';
import {
  ICareerDayService,
  IObjectiveService,
  IMailerService,
} from './../../../Domain/Services';
import {
  CareerDayService,
  ObjectiveService,
  MailerService,
} from './../../../Domain/Services/Impl/index';
import { UserServise } from './../../../Domain/RemoteServices/Impl';
import { IUserService } from './../../../Domain/RemoteServices';

export class DomainInstaller extends InstallerBase {
  public install(): void {
    this.container
      .bind<ICareerDayService>('CareerDayService')
      .to(CareerDayService);
    this.container
      .bind<IObjectiveService>('ObjectiveService')
      .to(ObjectiveService);
    this.container.bind<IUserService>('UserService').to(UserServise);
    this.container.bind<IMailerService>('MailerService').to(MailerService);
  }
}
