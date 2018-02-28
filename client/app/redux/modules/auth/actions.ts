import AUTH_ACTIONS from './actionConstants';
import { Dispatch } from 'redux/store';
import { IUser } from './reducer';
import { ROLES } from './constants';

export type LoginAsEmployee = () => (dispatch: Dispatch) => void;
export const loginAsEmployee: LoginAsEmployee = () => (dispatch: Dispatch) => {
  const user: IUser = {
    id: 1,
    Roles: ROLES.EMPLOYEE,
    LastName: 'Pupkin',
    FirstName: 'Vasya',
    PhotoUrl: 'https://vk.com/images/camera_200.png',
    AccessToken: 'token',
  };

  dispatch({
    type: AUTH_ACTIONS.LOGIN_AS_EMPLOYEE,
    payload: user,
  });
};

export type LoginAsUnitManager = () => (dispatch: Dispatch) => void;
export const loginAsUnitManager: LoginAsUnitManager = () => (dispatch: Dispatch) => {
  const user: IUser = {
    id: 4,
    Roles: ROLES.UNIT_MANAGER,
    LastName: 'Stasivich',
    FirstName: 'Kirill',
    PhotoUrl: 'https://vk.com/images/camera_200.png',
    AccessToken: 'token',
  };

  dispatch({
    type: AUTH_ACTIONS.LOGIN_AS_UNIT_MANAGER,
    payload: user,
  });
};
