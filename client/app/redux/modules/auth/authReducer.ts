import AUTH_ACTIONS from './authActionConstants';
import {ROLES} from './authConstants';

export interface IUser {
  role: ROLES;
  fullName: string;
}

export interface IAuthState {
  user: null | IUser;
}

const defaultState: IAuthState = {
  user: null,
};

export default function(state: IAuthState = defaultState, {type, payload}: { type: string, payload: any }) {
  switch (type) {
    case AUTH_ACTIONS.LOGIN_AS_EMPLOYEE:
    case AUTH_ACTIONS.LOGIN_AS_UNIT_MANAGER:
      return handleLogin(state, payload);

    default:
      return state;
  }
}

const handleLogin = (state: IAuthState, user: IUser) => {
  return {...state, user};
};
