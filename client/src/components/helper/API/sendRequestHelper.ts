import axios, { AxiosInstance, AxiosError } from 'axios';
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
          addNotification(notification)(store.dispatch);
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
