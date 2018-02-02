
import AUTH_ACTIONS from './authActionConstants';
import {Dispatch} from 'redux/store';
import {IUser} from './authReducer';
import {ROLES} from './authConstants';

export type LoginAsEmployee = () => (dispatch: Dispatch) => void;
export const loginAsEmployee: LoginAsEmployee = () => (dispatch: Dispatch) => {
  const user: IUser = {
    role: ROLES.EMPLOYEE,
    fullName: 'Pavel Markov',
  };

  dispatch({
    type: AUTH_ACTIONS.LOGIN_AS_EMPLOYEE,
    payload: user,
  });
};

export type LoginAsUnitManager = () => (dispatch: Dispatch) => void;
export const loginAsUnitManager: LoginAsUnitManager = () => (dispatch: Dispatch) => {
  const user: IUser = {
    role: ROLES.UNIT_MANAGER,
    fullName: 'Alex Denisenko',
  };

  dispatch({
    type: AUTH_ACTIONS.LOGIN_AS_UNIT_MANAGER,
    payload: user,
  });
};
