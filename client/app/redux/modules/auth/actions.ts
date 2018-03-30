import AUTH_CONSTANTS from './actionConstants';
import { Dispatch } from 'redux/store';
import * as axios from 'axios';
import { ILogin } from 'redux/modules/auth/reducer';

const axiosRequest: any = axios;

export type Login = (Email: string, Password: string) => (dispatch: Dispatch) => void;
export const login: Login = (Email: string, Password: string) => (dispatch: Dispatch) => {
  return axiosRequest.post('/api/auth', { Email, Password })
    .then((res: axios.AxiosResponse<ILogin>) => {
      const serialResponse = JSON.stringify(res.data);

      localStorage.setItem('loginData', serialResponse);

      dispatch({
        type: AUTH_CONSTANTS.LOGIN,
        payload: res.data,
      });
    })
    .catch((err: axios.AxiosError) => {
      console.error(err);
    });
};

export type VerifyCredentials = (dispatch: Dispatch) => any;
export const verifyCredentials: VerifyCredentials = (dispatch: Dispatch) => {
  const accessToken = localStorage.getItem('AccessToken');
  const refreshToken = localStorage.getItem('RefreshToken');
  const currentUser = localStorage.getItem('Data');

  // dispatch({
  //   type: AUTH_CONSTANTS.VERIFY_CREDENTIALS,
  //   payload: {
  //     FirstName: 'Kirill',
  //     LastName: 'Stasevich',
  //     PhotoUrl: 'https://vk.com/images/camera_200.png',
  //     Roles: 'manager',
  //     id: 4,
  //   },
  // });

  return axiosRequest.patch('api/auth/verifyCredentials/access-token', { accessToken })
    .then(() => {
      dispatch({
        type: AUTH_CONSTANTS.VERIFY_CREDENTIALS,
        payload: currentUser,
      });
    })
    .catch((err: axios.AxiosError) => {
      if (err.response.status === 401) {
        axiosRequest.patch('api/auth/refresh', { refreshToken })
          .then(() => {
            dispatch({
              type: AUTH_CONSTANTS.ACCESS_TOKEN_EXPIRED,
              payload: err.response.data,
            });
          })
          .catch((invalidRefreshToken: axios.AxiosError) => {
            localStorage.clear();

            dispatch({
              type: AUTH_CONSTANTS.REFRESH_TOKEN_EXPIRED,
              payload: invalidRefreshToken.response.data,
            });
          });
      } else {
        console.error(err);
      }
    });
};
