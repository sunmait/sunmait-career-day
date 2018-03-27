import AUTH_ACTIONS from './actionConstants';
import { Dispatch } from 'redux/store';
import { IUser } from './reducer';
import { ROLES } from './constants';
import * as axios from 'axios';
import { ICareerDayOfEmployee } from 'redux/modules/employees/reducer';

const axiosRequest: any = axios;

export type LoginAsEmployee = () => (dispatch: Dispatch) => void;
export const loginAsEmployee: LoginAsEmployee = () => (dispatch: Dispatch) => {
  return axiosRequest.get(`/api/users/employee`)
    .then((res: axios.AxiosResponse<ICareerDayOfEmployee>) => {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_AS_EMPLOYEE,
        payload: res.data,
      });
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
