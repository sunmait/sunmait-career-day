export interface IAuthService {
  authWithEmailAndPassword(email: string, password: string): Promise<object>;
  refreshSesstion(RefreshToken: string): Promise<object>;
}
