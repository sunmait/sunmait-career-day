import { injectable, inject } from 'inversify';
import { IUserService } from '../IUserService';
import {
  IUserRepository,
} from '../../../Data/Repositories/index';
import UserEntity from '../../../Data/Entities/UserEntity';
import { ICryptoService } from '../ICryptoService';
import { IMailerService } from '../IMailerService';
import { ISettingsProvider } from '../../../API/infrastructure';

@injectable()
export class UserServise implements IUserService {
  private readonly _userRepository: IUserRepository;
  private readonly _cryptoService: ICryptoService;
  private readonly _mailerService: IMailerService;
  private readonly _hostname: string;

  constructor(
    @inject('UserRepository') userRepository: IUserRepository,
    @inject('CryptoService') cryptoService: ICryptoService,
    @inject('MailerService') mailerService: IMailerService,
    @inject('SettingsProvider') settingsProvider: ISettingsProvider,
  ) {
    this._userRepository = userRepository;
    this._cryptoService = cryptoService;
    this._mailerService = mailerService;
    this._hostname = settingsProvider.getHostname();
  }

  public async registerUser(
    FirstName: string,
    LastName: string,
    Email: string,
    Password: string,
  ) {
    const userData = {
      FirstName,
      LastName,
      Email,
      PasswordHash: this._cryptoService.passwordHashing(Password),
    };
    const user = await this._userRepository.create(new UserEntity(userData));
    const emailData = {
      email: user.Email,
      link: this.createLinkForVerifyEmail(user.Email),
      name: user.FirstName,
    };
    await this._mailerService.sendEmail(emailData);
  }

  public async verifyEmail(encrtyptedEmail: string) {
    const email = this._cryptoService.decryptAES(encrtyptedEmail);
    const user = await this._userRepository.findOne({
      where: { Email: email },
    });
    if (user && !user.EmailVerified) {
      user.EmailVerified = true;
      await this._userRepository.update(user);
      return true;
    }

    return false;
  }

  private createLinkForVerifyEmail(email: string) {
    const encrtyptedEmail = encodeURIComponent(
      this._cryptoService.encrtyptAES(email),
    );
    return `${this._hostname}/api/users/verifyEmail/${encrtyptedEmail}`;
  }
}
