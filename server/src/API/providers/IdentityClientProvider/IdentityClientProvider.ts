import { injectable, inject } from 'inversify';
import { ISettingsProvider } from '../SettingsProvider';
import { IIdentityClientProvider } from './interfaces';
import * as jwt from 'jsonwebtoken';
import { IUserEntity } from '../AuthProvider/interfaces';
import { UserRoles } from '../../../Domain/helpers';

@injectable()
export class IdentityClientProvider implements IIdentityClientProvider {
  constructor(@inject('SettingsProvider') private _settingsProvider: ISettingsProvider) {}

  public async getAllUsers(): Promise<IUserEntity[]> {
    return [
      {
        id: '4741496c-2449-45fe-ab39-11e87157d230',
        Role: UserRoles.MANAGER,
        Email: 'Leanne.Homenick1@hotmail.com',
        FirstName: 'Leanne',
        LastName: 'Homenick',
      },
      {
        id: '25b60635-9f5a-4f01-9fc8-edd6da6647b8',
        Role: UserRoles.EMPLOYEE,
        Email: 'Rolando46@yahoo.com',
        FirstName: 'Rolando',
        LastName: 'Stokes',
      },
      {
        id: '79b947e5-5894-423d-843c-0a39754aa037',
        Role: UserRoles.EMPLOYEE,
        Email: 'josh.rossie@alphapoint.com',
        FirstName: 'Josh',
        LastName: 'Rossie',
      },
    ];
  }

  public async getUserInfo(accessToken: string): Promise<IUserEntity> {
    const { id } = jwt.verify(accessToken, process.env.JWT_SECRET as string) as {
      id: string;
    };
    const found = (await this.getAllUsers()).find((u) => u.id === id);

    if (!found) throw new Error(`User with it ${id} is not found`);

    return found;
  }
}
