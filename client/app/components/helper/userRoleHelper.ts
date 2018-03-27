import { IUser } from 'redux/modules/auth/reducer';
import { ROLES } from 'redux/modules/auth/constants';

export function isAuthAsManager(user: IUser): boolean {
  return user.Roles === ROLES.UNIT_MANAGER;
}

export function isAuthAsEmployee(user: IUser): boolean {
  return user.Roles === ROLES.EMPLOYEE;
}
