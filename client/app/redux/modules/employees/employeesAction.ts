import * as  axios from 'axios';
import EMPLOYEES_LIST from './employeesActionConstants';
import {Dispatch} from 'redux/store';
import {IEmployees} from './employeesReducer';

export type GetEmployeesList = () => (dispatch: Dispatch) => void;
export const getEmployeesList: GetEmployeesList = () => (dispatch: Dispatch) => {
  return axios.get('/api/employee')
    .then((res: axios.AxiosResponse<IEmployees[]>) => {
      dispatch({
        type: EMPLOYEES_LIST.GET_EMPLOYEES_LIST,
        payload: res.data,
      });
    })
    .catch((err: axios.AxiosError) => console.error(err));
};
