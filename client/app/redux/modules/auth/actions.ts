import AUTH_ACTIONS from './actionConstants';
import APP_ACTIONS from '../app/actionConstants';
import { Dispatch } from 'redux/store';
import { ROLES } from './constants';
import * as axios from 'axios';
import { IUser, IRegisteredUser } from './reducer';
import history from 'components/containers/history';

const axiosRequest: any = axios;

export type LoginAsEmployee = () => (dispatch: Dispatch) => void;
export const loginAsEmployee: LoginAsEmployee = () => (dispatch: Dispatch) => {
  return axiosRequest.get(`/api/users/employee`)
    .then((res: axios.AxiosResponse<IUser>) => {
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

export type SignUp = (registeredUser: IRegisteredUser) => (dispatch: Dispatch) => void;
export const signUp: SignUp = (registeredUser: IRegisteredUser) => (dispatch: Dispatch) => {
  return axiosRequest.post('/api/users', registeredUser)
    .then((res: axios.AxiosResponse<void>) => {
      if (res.status === 201) {
        history.push('/success');
      }
    })
    .catch((err: axios.AxiosError) => {
      if (err.response.status === 400) {
        dispatch({
          type: APP_ACTIONS.ADD_NOTIFICATION,
          payload: { status: err.response.status, message: 'User with the same email already exist' },
        });
      } else {
        dispatch({
          type: APP_ACTIONS.ADD_NOTIFICATION,
          payload: { status: err.response.status, message: err.response.statusText },
        });
      }
      console.error(err);

      return err;
    });
};
