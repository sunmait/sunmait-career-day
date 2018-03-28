import AUTH_ACTIONS from './actionConstants';
import { ROLES } from './constants';

const defaultState: IAuthState = {
  user: null,
};

export default function(
  state: IAuthState = defaultState,
  {type, payload}: { type: string; payload: any },
) {
  switch (type) {
    case AUTH_ACTIONS.LOGIN_AS_EMPLOYEE:
      return handleLogin(state, payload);
    case AUTH_ACTIONS.LOGIN_AS_UNIT_MANAGER:
      return handleLogin(state, payload);

    default:
      return state;
  }
}

const handleLogin = (state: IAuthState, user: IUser) => {
  return {...state, user};
};

export interface IUser {
  id: number;
  Roles: ROLES;
  LastName: string;
  FirstName: string;
  PhotoUrl: string;
  AccessToken: string;
}

export interface IAuthState {
  user: null | IUser;
}
