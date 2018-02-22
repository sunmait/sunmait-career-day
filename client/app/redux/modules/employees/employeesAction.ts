import * as axios from 'axios';
import EMPLOYEES_LIST from './employeesActionConstants';
import {Dispatch} from 'redux/store';
import {IEmployees, ICareerDaysOfEmployee, IObjectives} from './employeesReducer';

const axiosRequest: any = axios;

export type GetEmployeesList = () => (dispatch: Dispatch) => void;
export const getEmployeesList: GetEmployeesList = () => (dispatch: Dispatch) => {
  return axiosRequest.get('/api/users/employees')
    .then((res: axios.AxiosResponse<IEmployees[]>) => {
      dispatch({
        type: EMPLOYEES_LIST.GET_EMPLOYEES_LIST,
        payload: res.data,
      });
    })
    .catch((err: axios.AxiosError) => {
      console.error(err);

      return err;
    });
};

export type GetCareerDaysOfEmployee = (employeeFullName: string, userId: number) => (dispatch: Dispatch) => void;
export const getCareerDayOfEmployee: GetCareerDaysOfEmployee = (employeeFullName: string, userId: number) => (dispatch: Dispatch) => {
  return axiosRequest.get(`/api/career-days/${userId}`)
    .then((res: axios.AxiosResponse<ICareerDaysOfEmployee[]>) => {
      dispatch({
        type: EMPLOYEES_LIST.GET_CAREER_DAYS,
        payload: {
          careerDays: res.data,
          employeeFullName,
        },
      });
    })
    .catch((err: axios.AxiosError) => {
      console.error(err);

      return err;
    });
};

export type GetObjectives = (careerDayId: number) => (dispatch: Dispatch) => void;
export const getObjectives: GetObjectives = (careerDayId: number) => (dispatch: Dispatch) => {
  return axiosRequest.get(`/api/objectives/${careerDayId}`)
    .then((res: axios.AxiosResponse<IObjectives[]>) => {
      dispatch({
        type: EMPLOYEES_LIST.GET_OBJECTIVES,
        payload: res.data,
      });
    })
    .catch((err: axios.AxiosError) => {
      console.error(err);

      return err;
    });
};
