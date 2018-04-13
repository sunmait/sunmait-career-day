import { injectable, inject } from 'inversify';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

import { ISettingsProvider } from '../../../API/infrastructure/index';
import { ISessionRepository, IUserRepository } from '../../../Data/Repositories';
import SessionEntity from '../../../Data/Entities/SessionEntity';
import { ICryptoService } from '../ICryptoService';
import UserEntity from '../../../Data/Entities/UserEntity';
import { IAuthService } from '../IAuthService';
import { IAuthData, IUserDecodedFromToken } from '../../helpers/index';

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

  public async authWithEmailAndPassword(email: string, password: string): Promise<IAuthData> {
    const user = await this._userRepository.findOne({
      where: { Email: email },
    });

    if (user && this._cryptoService.passwordsVerification(password, user.PasswordHash) && user.EmailVerified) {
      const session = await this.createSession(user.get({ plain: true }));

      return {
        AccessToken: session.AccessToken,
        RefreshToken: session.RefreshToken,
        Data: {
          id: user.id,
          Role: user.Role,
          FirstName: user.FirstName,
          LastName: user.LastName,
          PhotoUrl: user.PhotoUrl,
        },
      } as IAuthData;
    } else {
      throw { status: 401 };
    }
  }

  public async refreshSession(RefreshToken: string): Promise<IAuthData> {
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
          Role: updatedSession.User.Role,
          FirstName: updatedSession.User.FirstName,
          LastName: updatedSession.User.LastName,
          PhotoUrl: updatedSession.User.PhotoUrl,
        },
      } as IAuthData;
    } else {
      throw { status: 401, message: 'jwt expired' };
    }
  }

  public async verifyCredentials({ accessToken, refreshToken }): Promise<IAuthData> {
    if (accessToken && refreshToken) {
      try {
        const payload = jwt.verify(accessToken, this._secretKey) as IUserDecodedFromToken;

        return {
          AccessToken: accessToken,
          RefreshToken: refreshToken,
          Data: {
            id: payload.id,
            Role: payload.Role,
            FirstName: payload.FirstName,
            LastName: payload.LastName,
            PhotoUrl: payload.PhotoUrl,
          },
        } as IAuthData;
      } catch (err) {
        if (err.message === 'jwt expired') {
          return this.refreshSession(refreshToken);
        } else {
          throw { status: 401 };
        }
      }
    } else {
      throw { status: 401 };
    }
  }

  public async logout(refreshToken: string): Promise<void> {
    const session = await this._sessionRepository.findOne({
      where: { refreshToken },
    });

    if (session) {
      await this._sessionRepository.remove({ where: { refreshToken } });
    } else {
      throw { status: 401 };
    }
  }

  private async updateSession(session: SessionEntity): Promise<SessionEntity> {
    const { AccessToken, RefreshToken } = this.getTokens(session.User.get({ plain: true }));

    session.LastRefresh = moment().toDate();
    session.ExpiresIn = moment()
      .add(20, 'day')
      .toDate();
    session.AccessToken = AccessToken;
    session.RefreshToken = RefreshToken;

    return this._sessionRepository.update(session);
  }

  private async createSession(user: UserEntity): Promise<SessionEntity> {
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

  private getTokens(user: UserEntity): { AccessToken: string; RefreshToken: string } {
    const payload = {
      id: user.id,
      Role: user.Role,
      PhotoUrl: user.PhotoUrl,
      LastName: user.LastName,
      FirstName: user.FirstName,
      Email: user.Email,
    };
    const AccessToken = jwt.sign(payload, this._secretKey, {
      expiresIn: '1h',
    });
    const RefreshToken = this._cryptoService.sha256Hashing(AccessToken);

    return { AccessToken, RefreshToken };
  }
}
