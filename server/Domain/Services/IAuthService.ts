export interface IAuthService {
  authWithEmailAndPassword(email: string, password: string): Promise<IAuthData>;
  refreshSession(RefreshToken: string): Promise<IAuthData>;
  verifyCredentials({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }): Promise<IAuthData>;
  logout(RefreshToken: string): Promise<void>;
}

export interface IAuthData {
  AccessToken: string;
  RefreshToken: string;
  Data: {
    id: number;
    Roles: string;
    FirstName: string;
    LastName: string;
    PhotoUrl: string;
  };
}
