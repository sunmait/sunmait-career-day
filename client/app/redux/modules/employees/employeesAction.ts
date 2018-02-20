import * as  axios from 'axios';
import EMPLOYEES_LIST from './employeesActionConstants';
import {Dispatch} from 'redux/store';
import {IEmployees, ICareerDaysOfEmployee, IObjectives} from './employeesReducer';

export type GetEmployeesList = () => (dispatch: Dispatch) => void;
export const getEmployeesList: GetEmployeesList = () => (dispatch: Dispatch) => {
  return axios.get('/api/users/employees')
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

export type GetCareerDaysOfEmployee = (employeeFullName: string) => (dispatch: Dispatch) => void;
export const getCareerDayOfEmployee: GetCareerDaysOfEmployee = (employeeFullName: string) => (dispatch: Dispatch) => {
  return axios.get(`/api/career-days/1`)
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

export type GetObjectives = () => (dispatch: Dispatch) => void;
export const getObjectives: GetObjectives = () => (dispatch: Dispatch) => {
  return axios.get(`/api/objectives/`)
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
