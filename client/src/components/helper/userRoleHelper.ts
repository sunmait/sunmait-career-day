import { IUser } from '../../redux/modules/oidc/reducer';
import { ROLES } from '../../redux/modules/oidc/constants';

export function isAuthAsManager(user: IUser): boolean {
  return user.profile.role === ROLES.UNIT_MANAGER;
}

export function isAuthAsEmployee(user: IUser): boolean {
  return user.profile.role === ROLES.EMPLOYEE;
}

export function isUserHasAllowedRole(
  allowedRoles: ROLES[] | undefined,
  user: IUser,
) {
  return !allowedRoles || allowedRoles.indexOf(user.profile.role) !== -1;
}
