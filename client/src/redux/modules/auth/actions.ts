import AUTH_CONSTANTS from './actionConstants';
import { Dispatch } from '../../store';
import APP_ACTIONS from '../app/actionConstants';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { IRegisteredUser, ILogin } from './reducer';
import history from '../../../components/containers/history';

export const login = (Email: string, Password: string) => (
  dispatch: Dispatch,
) => {
  return axios
    .post('/api/auth', { Email, Password })
    .then((res: AxiosResponse<ILogin>) => {
      return dispatch(setAuthData(res.data));
    })
    .catch((err: AxiosError) => {
      console.error(err);
      throw err;
    });
};

export const verifyCredentials = async (dispatch: Dispatch) => {
  const accessToken = localStorage.getItem('AccessToken');
  const refreshToken = localStorage.getItem('RefreshToken');
  const currentUser = JSON.parse(localStorage.getItem('User') || 'null');

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
      const res = await axios.patch('/api/auth/verify-credentials', {
        accessToken,
        refreshToken,
      });
      return dispatch(setAuthData(res.data));
    } catch (err) {
      if (err.response.status === 401) {
        return dispatch(clearAuthData());
      } else {
        console.error(err);
        throw err;
      }
    }
  } else {
    return dispatch(clearAuthData());
  }
};

export const signUp = (registeredUser: IRegisteredUser) => (
  dispatch: Dispatch,
) => {
  return axios
    .post('/api/users', registeredUser)
    .then((res: AxiosResponse<void>) => {
      if (res.status === 201) {
        history.push('/success');
      }
    })
    .catch((err: AxiosError) => {
      if (err.response && err.response.status === 400) {
        const message =
          err.response.status === 400
            ? 'User with the same email already exist'
            : err.response.statusText;

        dispatch({
          type: APP_ACTIONS.ADD_NOTIFICATION,
          payload: {
            status: err.response.status,
            message,
          },
        });
      }
      console.error(err);
      throw err;
    });
};

export const logout = (refreshToken: string) => (dispatch: Dispatch) => {
  return axios
    .delete(`/api/auth/${refreshToken}`)
    .then(() => {
      dispatch(clearAuthData());
    })
    .catch((err: AxiosError) => {
      if (err.response && err.response.status === 401) {
        dispatch(clearAuthData());
      } else if (err.response && err.response.status === 500) {
        history.push('/error/server-error"');
      } else {
        console.error(err);
        throw err;
      }
    });
};

export const setAuthData = (loginData: ILogin) => (dispatch: Dispatch) => {
  const { AccessToken, RefreshToken, Data } = loginData;
  const User = JSON.stringify(Data);

  localStorage.setItem('AccessToken', AccessToken);
  localStorage.setItem('RefreshToken', RefreshToken);
  localStorage.setItem('User', User);

  return dispatch({
    type: AUTH_CONSTANTS.LOGIN,
    payload: loginData,
  });
};

export const clearAuthData = () => (dispatch: Dispatch) => {
  localStorage.clear();

  return dispatch({
    type: AUTH_CONSTANTS.LOGOUT,
  });
};
