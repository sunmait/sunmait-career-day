import { IUserEntity } from '../../AuthProvider/interfaces';

export interface IIdentityClientProvider {
  getUserInfo(accessToken: string): Promise<IUserEntity>;
}
