export interface IAuthService {
  authWithEmailAndPassword(email: string, password: string): Promise<object>;
  refreshSession(RefreshToken: string): Promise<object>;
}
