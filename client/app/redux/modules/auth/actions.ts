import AUTH_CONSTANTS from './actionConstants';
import { Dispatch } from 'redux/store';
import APP_ACTIONS from '../app/actionConstants';
import * as axios from 'axios';
import { IRegisteredUser, ILogin } from './reducer';
import history from 'components/containers/history';
import { logout as logoutUser } from 'components/helper/authRequest';

const axiosRequest: any = axios;

export const login = (Email: string, Password: string) => (dispatch: Dispatch) => {
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
      throw err;
    });
};

export const verifyCredentials = async (dispatch: Dispatch) => {
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
    try {
      const res = await axiosRequest.patch('/api/auth/verify-credentials', {
        accessToken,
        refreshToken,
      });
      const { AccessToken, RefreshToken } = res.data;
      const User = JSON.stringify(res.data.Data);

      localStorage.setItem('AccessToken', AccessToken);
      localStorage.setItem('RefreshToken', RefreshToken);
      localStorage.setItem('User', User);

      dispatch({
        type: AUTH_CONSTANTS.LOGIN,
        payload: res.data,
      });
    } catch (err) {
      if (err.response.status === 401) {
        localStorage.clear();
        dispatch({
          type: AUTH_CONSTANTS.LOGOUT,
        });
      } else {
        console.error(err);
        throw err;
      }
    }
  } else {
    logoutUser();
  }
};

export const signUp = (registeredUser: IRegisteredUser) => (dispatch: Dispatch) => {
  return axiosRequest
    .post('/api/users', registeredUser)
    .then((res: axios.AxiosResponse<void>) => {
      if (res.status === 201) {
        history.push('/success');
      }
    })
    .catch((err: axios.AxiosError) => {
      if (err.response.status === 400) {
        dispatch({
          type: APP_ACTIONS.ADD_NOTIFICATION,
          payload: {
            status: err.response.status,
            message: 'User with the same email already exist',
          },
        });
      } else {
        dispatch({
          type: APP_ACTIONS.ADD_NOTIFICATION,
          payload: {
            status: err.response.status,
            message: err.response.statusText,
          },
        });
      }
      console.error(err);
      throw err;
    });
};

export const logout = (refreshToken: string) => (dispatch: Dispatch) => {
  return axiosRequest
    .delete(`/api/auth/${refreshToken}`)
    .then(() => {
      // TODO: import logout function from helper
      localStorage.clear();

      dispatch({
        type: AUTH_CONSTANTS.LOGOUT,
      });
    })
    .catch((err: axios.AxiosError) => {
      if (err.response.status === 401) {
        localStorage.clear();

        dispatch({
          type: AUTH_CONSTANTS.LOGOUT,
        });
      } else if (err.response.status === 500) {
        history.push('/error/server-error"');
      } else {
        console.error(err);
        throw err;
      }
    });
};
