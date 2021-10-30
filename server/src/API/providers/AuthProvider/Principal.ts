import { interfaces } from 'inversify-express-utils';
import { IUserEntity } from './interfaces';
import { UserRoles } from '../../../Domain/helpers';

export class Principal implements interfaces.Principal {
  public details: IUserEntity;

  public constructor(details: IUserEntity) {
    this.details = details;
  }

  public isAuthenticated(): Promise<boolean> {
    return Promise.resolve(!!this.details);
  }

  public isResourceOwner(): Promise<boolean> {
    return Promise.resolve(true);
  }

  public isInRole(role: UserRoles): Promise<boolean> {
    return Promise.resolve(this.details.Role === role);
  }

  public isInRoles(roles: UserRoles[]): boolean {
    return roles.indexOf(this.details.Role) !== -1;
  }
}
