import axios, {AxiosInstance, AxiosResponse, AxiosError} from 'axios';
import EMPLOYEES_LIST from './employeesActionConstants';
import {Dispatch} from 'redux/store';
import {IEmployees, ICareerDaysOfEmployee, IObjectives} from './employeesReducer';

const axiosRequest: AxiosInstance = axios.create();

export type GetEmployeesList = () => (dispatch: Dispatch) => void;
export const getEmployeesList: GetEmployeesList = () => (dispatch: Dispatch) => {
  return axiosRequest.get('/api/users/employees')
    .then((res: AxiosResponse<IEmployees[]>) => {
      dispatch({
        type: EMPLOYEES_LIST.GET_EMPLOYEES_LIST,
        payload: res.data,
      });
    })
    .catch((err: AxiosError) => {
      console.error(err);

      return err;
    });
};

export type GetCareerDaysOfEmployee = (employeeFullName: string) => (dispatch: Dispatch) => void;
export const getCareerDayOfEmployee: GetCareerDaysOfEmployee = (employeeFullName: string) => (dispatch: Dispatch) => {
  return axiosRequest.get(`/api/career-days/1`)
    .then((res: AxiosResponse<ICareerDaysOfEmployee[]>) => {
      dispatch({
        type: EMPLOYEES_LIST.GET_CAREER_DAYS,
        payload: {
          careerDays: res.data,
          employeeFullName,
        },
      });
    })
    .catch((err: AxiosError) => {
      console.error(err);

      return err;
    });
};

export type GetObjectives = () => (dispatch: Dispatch) => void;
export const getObjectives: GetObjectives = () => (dispatch: Dispatch) => {
  return axiosRequest.get(`/api/objectives/`)
    .then((res: AxiosResponse<IObjectives[]>) => {
      dispatch({
        type: EMPLOYEES_LIST.GET_OBJECTIVES,
        payload: res.data,
      });
    })
    .catch((err: AxiosError) => {
      console.error(err);

      return err;
    });
};
