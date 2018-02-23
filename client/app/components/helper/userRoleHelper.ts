import {IUser} from 'redux/modules/auth/reducer';
import {ROLES} from 'redux/modules/auth/constants';

export default function isAuthAsManager(user: IUser): boolean {
  return (user.role === ROLES.UNIT_MANAGER);
}
