import AUTH_ACTIONS from './actionConstants';
import { Dispatch } from 'redux/store';
import APP_ACTIONS from '../app/actionConstants';
import * as axios from 'axios';
import { IUser, IRegisteredUser } from './reducer';
import history from 'components/containers/history';
import { ILogin } from 'redux/modules/auth/reducer';

const axiosRequest: any = axios;

export type Login = (
  Email: string,
  Password: string,
) => (dispatch: Dispatch) => void;
export const login: Login = (Email: string, Password: string) => (
  dispatch: Dispatch,
) => {
  return axiosRequest
    .post('/api/auth', { Email, Password })
    .then((res: axios.AxiosResponse<ILogin>) => {
      const { AccessToken, RefreshToken } = res.data;
      const User = JSON.stringify(res.data.Data);

      localStorage.setItem('AccessToken', AccessToken);
      localStorage.setItem('RefreshToken', RefreshToken);
      localStorage.setItem('User', User);

      dispatch({
        type: AUTH_CONSTANTS.LOGIN,
        payload: res.data,
      });
    })
    .catch((err: axios.AxiosError) => {
      console.error(err);
    });
};

export type VerifyCredentials = (dispatch: Dispatch) => void;
export const verifyCredentials: VerifyCredentials = (dispatch: Dispatch) => {
  const accessToken = localStorage.getItem('AccessToken');
  const refreshToken = localStorage.getItem('RefreshToken');
  const currentUser = JSON.parse(localStorage.getItem('User'));

  if (accessToken && refreshToken && currentUser) {
    dispatch({
      type: AUTH_CONSTANTS.LOGIN,
      payload: {
        AccessToken: accessToken,
        RefreshToken: refreshToken,
        Data: currentUser,
      },
    });
    axiosRequest
      .patch('/api/auth/verify-credentials', { accessToken, refreshToken })
      .then((res: axios.AxiosResponse<ILogin>) => {
        const { AccessToken, RefreshToken } = res.data;
        const User = JSON.stringify(res.data.Data);

        localStorage.setItem('AccessToken', AccessToken);
        localStorage.setItem('RefreshToken', RefreshToken);
        localStorage.setItem('User', User);

        dispatch({
          type: AUTH_CONSTANTS.LOGIN,
          payload: res.data,
        });
      })
      .catch((err: axios.AxiosError) => {
        if (err.response.status === 401) {
          localStorage.clear();
          dispatch({
            type: AUTH_CONSTANTS.LOGOUT,
          });
        } else {
          console.error(err);
        }
      });
  }
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
