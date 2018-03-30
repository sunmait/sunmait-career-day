import { injectable, inject } from 'inversify';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

import { ISettingsProvider } from '../../../API/infrastructure/index';
import { IAuthService } from '../index';
import {
  ISessionRepository,
  IUserRepository,
} from '../../../Data/Repositories';
import SessionEntity from '../../../Data/Entities/SessionEntity';
import { ICryptoService } from '../ICryptoService';
import UserEntity from '../../../Data/Entities/UserEntity';

@injectable()
export class AuthService implements IAuthService {
  private readonly _userRepository: IUserRepository;
  private readonly _secretKey: string;
  private readonly _cryptoService: ICryptoService;
  private readonly _sessionRepository: ISessionRepository;

  constructor(
    @inject('UserRepository') userRepository: IUserRepository,
    @inject('CryptoService') cryptoService: ICryptoService,
    @inject('SessionRepository') sessionRepository: ISessionRepository,
    @inject('SettingsProvider') settingsProvider: ISettingsProvider,
  ) {
    this._userRepository = userRepository;
    this._cryptoService = cryptoService;
    this._secretKey = settingsProvider.getSecretKey();
    this._sessionRepository = sessionRepository;
  }

  public async authWithEmailAndPassword(email: string, password: string) {
    const user = await this._userRepository.findOne({
      where: { Email: email },
    });
    if (
      user &&
      this._cryptoService.passwordsVerification(password, user.PasswordHash) &&
      user.EmailVerified
    ) {
      const session = await this.createSession(user.get({ plain: true }));
      return {
        AccessToken: session.AccessToken,
        RefreshToken: session.RefreshToken,
        Data: {
          id: user.id,
          Roles: user.Roles,
          FirstName: user.FirstName,
          LastName: user.LastName,
          PhotoUrl: user.PhotoUrl,
        },
      };
    } else {
      throw { status: 401 };
    }
  }

  public async refreshSession(RefreshToken: string) {
    const session = await this._sessionRepository.findOne({
      where: { RefreshToken },
      include: UserEntity,
    });
    if (session && moment() < moment(session.ExpiresIn)) {
      const updatedSession = await this.updateSession(session);
      return {
        AccessToken: updatedSession.AccessToken,
        RefreshToken: updatedSession.RefreshToken,
        Data: {
          id: updatedSession.User.id,
          Roles: updatedSession.User.Roles,
          FirstName: updatedSession.User.FirstName,
          LastName: updatedSession.User.LastName,
          PhotoUrl: updatedSession.User.PhotoUrl,
        },
      };
    } else {
      throw { status: 401 };
    }
  }

  private async updateSession(session: SessionEntity) {
    const { AccessToken, RefreshToken } = this.getTokens(
      session.User.get({ plain: true }),
    );
    session.LastRefresh = moment().toDate();
    session.ExpiresIn = moment()
      .add(20, 'day')
      .toDate();
    session.AccessToken = AccessToken;
    session.RefreshToken = RefreshToken;
    return this._sessionRepository.update(session);
  }

  private async createSession(user: UserEntity) {
    const { AccessToken, RefreshToken } = this.getTokens(user);
    const session = new SessionEntity({
      UserId: user.id,
      AccessToken,
      RefreshToken,
      LastRefresh: moment(),
      ExpiresIn: moment().add(20, 'day'),
    });
    await this._sessionRepository.create(session);
    return session;
  }

  private getTokens(payload: any) {
    const AccessToken = jwt.sign(payload, this._secretKey, { expiresIn: '1h' });
    const RefreshToken = this._cryptoService.sha256Hashing(AccessToken);
    return { AccessToken, RefreshToken };
  }
}
