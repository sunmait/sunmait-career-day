import * as request from 'superagent';
import EMPLOYEES_LIST from './employeesActionConstants';
import {Dispatch} from 'redux/store';

export type GetEmployeesList = () => (dispatch: Dispatch) => void;
export const getEmployeesList: GetEmployeesList = () => (dispatch: Dispatch) => {
  request
    .get('/api/employee')
    .end((err, res) => {
      if (err) {
        console.log(err.message);
      }

      dispatch({
        type: EMPLOYEES_LIST.GET_EMPLOYEES_LIST,
        payload: res.body,
      });
    });
};
