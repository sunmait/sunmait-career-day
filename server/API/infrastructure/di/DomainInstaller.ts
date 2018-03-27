import { InstallerBase } from './InstallerBase';
import {
  ICareerDayService,
  IObjectiveService,
  IUserService,
  IMailerService,
  ICryptoService,
  IAuthService,
} from './../../../Domain/Services/index';
import {
  CareerDayService,
  ObjectiveService,
  UserServise,
  MailerService,
  CryptoService,
  AuthService,
} from './../../../Domain/Services/Impl/index';

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
    this.container.bind<ICryptoService>('CryptoService').to(CryptoService);
    this.container.bind<IAuthService>('AuthService').to(AuthService);
  }
}
