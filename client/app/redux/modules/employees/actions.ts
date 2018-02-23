import * as axios from 'axios';
import EMPLOYEES_LIST from './actionConstants';
import {Dispatch} from 'redux/store';
import {IEmployee, ICareerDayOfEmployee, ICareerDay} from './reducer';

const axiosRequest: any = axios;

export type GetEmployeesList = () => (dispatch: Dispatch) => void;
export const getEmployeesList: GetEmployeesList = () => (dispatch: Dispatch) => {
  return axiosRequest.get('/api/users/employees')
    .then((res: axios.AxiosResponse<IEmployee[]>) => {
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

export type GetCareerDaysOfEmployee = (employee: IEmployee) => (dispatch: Dispatch) => void;
export const getCareerDayOfEmployee: GetCareerDaysOfEmployee = (employee: IEmployee) => (dispatch: Dispatch) => {
  return axiosRequest.get(`/api/career-days/${employee.id}`)
    .then((res: axios.AxiosResponse<ICareerDayOfEmployee[]>) => {
      dispatch({
        type: EMPLOYEES_LIST.GET_CAREER_DAYS,
        payload: res.data,
      });
    })
    .catch((err: axios.AxiosError) => {
      console.error(err);

      return err;
    });
};

export type GetSelectedCareerDay = (careerDayId: number) => (dispatch: Dispatch) => void;
export const getSelectedCareerDay: GetSelectedCareerDay = (careerDayId: number) => (dispatch: Dispatch) => {
  return axiosRequest.get(`/api/objectives/${careerDayId}`)
    .then((res: axios.AxiosResponse<ICareerDayOfEmployee>) => {
      dispatch({
        type: EMPLOYEES_LIST.GET_SELECTED_CAREER_DAY,
        payload: res.data,
      });
    })
    .catch((err: axios.AxiosError) => {
      console.error(err);

      return err;
    });
};

export type GetSelectedEmployee = (employee: IEmployee) => (dispatch: Dispatch) => void;
export const getSelectedEmployee: GetSelectedEmployee = (employee: IEmployee) => (dispatch: Dispatch) => {
  dispatch({
    type: EMPLOYEES_LIST.GET_SELECTED_EMPLOYEE,
    payload: employee,
  });
};

export type AddCareerDay = (careerDay: ICareerDay) => (dispatch: Dispatch) => void;
export const addCareerDay: AddCareerDay = (careerDay: ICareerDay) => (dispatch: Dispatch) => {
  return axiosRequest.post(`/api/career-days`, careerDay)
    .then((res: axios.AxiosResponse<ICareerDayOfEmployee>) => {
      dispatch({
        type: EMPLOYEES_LIST.ADD_CAREER_DAY,
        payload: res.data,
      });
    })
    .catch((err: axios.AxiosError) => {
      console.error(err);

      return err;
    });
};
