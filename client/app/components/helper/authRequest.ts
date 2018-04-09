import * as axios from 'axios';
import store from 'redux/store';
import { ILogin } from 'redux/modules/auth/reducer';
import AUTH_ACTIONS from 'redux/modules/auth/actionConstants';

const axiosRequest: any = axios;

function sendRequest(method: string, url: string, body?: any) {
  const accessToken = localStorage.getItem('AccessToken');

  return new Promise((resolve, reject) => {
    if (accessToken) {
      const params = [];

      params.push(url);
      if (body || method === 'patch' || method === 'post') {
        params.push(body || {});
      }
      params.push({
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      axiosRequest[method](...params)
        .then((res: axios.AxiosResponse<any>) => {
          resolve(res);
        })
        .catch((err: axios.AxiosError) => {
          if (err.response.status === 401 && err.response.statusText === 'jwt expired') {
            refreshTokens(method, url, body)
              .then((res: any) => resolve(res))
              .catch((error: any) => reject(error));
          } else {
            reject(err);
          }
        });
    } else {
      logout();
    }
  });
}

function refreshTokens(method: string, url: string, body?: any) {
  const refreshToken = localStorage.getItem('RefreshToken');

  return new Promise((resolve, reject) => {
    axiosRequest
      .patch(`/api/auth/refresh/${refreshToken}`)
      .then((res: axios.AxiosResponse<ILogin>) => {
        const { AccessToken, RefreshToken } = res.data;
        const User = JSON.stringify(res.data.Data);

        localStorage.setItem('AccessToken', AccessToken);
        localStorage.setItem('RefreshToken', RefreshToken);
        localStorage.setItem('User', User);

        store.dispatch({
          type: AUTH_ACTIONS.LOGIN,
          payload: res.data,
        });

        sendRequest(method, url, body)
          .then((result: any) => resolve(result))
          .catch((err: any) => reject(err));
      })
      .catch((err: axios.AxiosError) => {
        if (err.response.status === 401 && err.response.statusText === 'jwt expired') {
          logout();
        } else {
          reject(err);
        }
      });
  });
}

export function logout() {
  localStorage.clear();

  store.dispatch({
    type: AUTH_ACTIONS.LOGOUT,
  });
}

export default sendRequest;
