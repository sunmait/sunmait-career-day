import AUTH_CONSTANTS from './actionConstants';
import { Dispatch } from 'redux/store';
import * as axios from 'axios';
import { IRegisteredUser, ILogin } from './reducer';
import history from 'components/containers/history';
import { logout as logoutUser } from 'components/helper/authRequest';
import { addNotification } from 'redux/modules/app/actions';

const axiosRequest: any = axios;

export type Login = (Email: string, Password: string) => (dispatch: Dispatch) => axios.AxiosPromise;

export function login(Email: string, Password: string) {
  return (dispatch: Dispatch) => {
    return axiosRequest.post('/api/auth', { Email, Password })
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
        // TODO: addNotification
        console.error(err);
        throw err;
      });
  };
}

export type VerifyCredentials = (dispatch: Dispatch) => void;
export const verifyCredentials: VerifyCredentials = async (dispatch: Dispatch) => {
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
        logoutUser();
      } else {
        console.error(err);
        throw err;
      }
    }
  } else {
    logoutUser();
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
      dispatch(addNotification({ status: err.response.status, message: err.response.statusText }));
      throw err;
    });
};

export type Logout = (refreshToken: string) => (dispatch: Dispatch) => void;
export const logout: Logout = (refreshToken: string) => () => {
  return axiosRequest.delete(`/api/auth/${refreshToken}`)
    .then(() => {
      logoutUser();
    })
    .catch((err: axios.AxiosError) => {
      if (err.response.status === 401) {
        logoutUser();
      } else if (err.response.status === 500) {
        history.push('/error/server-error');
      } else {
        console.error(err);
        throw err;
      }
    });
};
