import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import CONFIG from './config';
import store from '../../../redux/store';
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
      const { user } = store.getState().oidc;
      if (user) {
        const accessToken = user.access_token;
        const headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        };
        return { ...config, headers };
      }
      return config;
    });
  }

  private registerErrorHandler = () => {
    this.axiosInstance.interceptors.response.use(
      response => response,
      (error: AxiosError) => {
        if (error.response) {
          const errorMessage = this.getErrorMessage(error.response);
          const notification = {
            status: error.response.data.code,
            message: errorMessage,
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

  private getErrorMessage = (response: AxiosResponse<any>) => {
    const { code, message, errors = {} } = response.data;
    let result: string;
    if (code === 403) {
      result = 'You don\'t have access to this action';
    } else if (code === 401) {
      result = 'You should be authorized for this action';
    } else if (code === 404) {
      result = 'This item is not found';
    } else {
      const validationMessage = Object.keys(errors).reduce((acc, key) => `${acc}\n${errors[key]}`, '');
      result = validationMessage ? `${message}: ${validationMessage}` : message;
    }
    return result;
  }
}

const sendRequestHelper = new SendRequestHelper();

export default sendRequestHelper;
