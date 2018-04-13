import { IAuthData } from '../helpers/index';

export interface IAuthService {
  authWithEmailAndPassword(email: string, password: string): Promise<IAuthData>;
  refreshSession(RefreshToken: string): Promise<IAuthData>;
  verifyCredentials({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }): Promise<IAuthData>;
  logout(RefreshToken: string): Promise<void>;
}
