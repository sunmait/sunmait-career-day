import {IUser} from 'redux/modules/auth/authReducer';
import {ROLES} from 'redux/modules/auth/authConstants';

export default function isAuthAsManager(user: IUser): boolean {
  return (user.role === ROLES.UNIT_MANAGER);
}
