import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import CONFIG from './config';
import store from '../../../redux/store';
import { ILogin } from '../../../redux/modules/auth/reducer';
import {
  setAuthData,
  clearAuthData,
} from '../../../redux/modules/auth/actions';
import { addNotification } from '../../../redux/modules/app/actions';

class SendRequestHelper {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: CONFIG.BASE_URL,
      timeout: CONFIG.TIMEOUT,
    });
    this.registerAuthTokenInterceptor();
    this.registerErrorHandler();
  }

  private registerAuthTokenInterceptor = () => {
    this.axiosInstance.interceptors.request.use(config => {
      const accessToken = localStorage.getItem('AccessToken');
      const headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
      return { ...config, headers };
    });

    this.axiosInstance.interceptors.response.use(
      response => response,
      async (error: AxiosError) => {
        if (this.isTokenExpireError(error)) {
          await this.refreshTokens();
          return this.axiosInstance.request(error.config);
        }
        return Promise.reject(error);
      },
    );
  }

  private isTokenExpireError = (error: AxiosError): boolean => {
    return (
      !!error.response &&
      error.response.status === 401 &&
      error.response.statusText === 'jwt expired'
    );
  }

  private refreshTokens = async () => {
    try {
      const refreshToken = localStorage.getItem('RefreshToken');

      const response: AxiosResponse<ILogin> = await axios.patch(
        `/api/auth/refresh/${refreshToken}`,
      );
      store.dispatch(setAuthData(response.data));

      const { AccessToken } = response.data;
      return AccessToken;
    } catch (err) {
      if (this.isTokenExpireError(err)) {
        return store.dispatch(clearAuthData());
      }
      throw err;
    }
  }

  private registerErrorHandler = () => {
    this.axiosInstance.interceptors.response.use(
      response => response,
      (error: AxiosError) => {
        if (error.response) {
          const { message, code, errors = {} } = error.response.data;
          const validationMessage = Object.keys(errors).reduce(
            (result, key) => `${result}\n${errors[key]}`,
            '',
          );
          const notification = {
            status: code,
            message: validationMessage
              ? `${message}: ${validationMessage}`
              : message,
          };
          store.dispatch(addNotification(notification));
        }
        throw error;
      },
    );
  }

  public get = <T>(url: string, params?: any) => {
    return this.axiosInstance.get<T>(url, {
      params,
    });
  }

  public post = <T>(url: string, data?: any) => {
    return this.axiosInstance.post<T>(url, data);
  }

  public delete = (url: string) => {
    return this.axiosInstance.delete(url);
  }

  public patch = <T>(url: string, data?: any) => {
    return this.axiosInstance.patch<T>(url, data);
  }
}

const sendRequestHelper = new SendRequestHelper();

export default sendRequestHelper;
