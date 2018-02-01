<<<<<<< HEAD
import * as request from 'superagent';
=======
>>>>>>> d161a6f... manager page was added in route+additions to tslint config
import EMPLOYEES_LIST from './employeesActionConstants';
import {Dispatch} from 'redux/store';

export type GetEmployeesList = () => (dispatch: Dispatch) => void;
export const getEmployeesList: GetEmployeesList = () => (dispatch: Dispatch) => {
<<<<<<< HEAD
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
=======
  dispatch({
    type: EMPLOYEES_LIST.GET_EMPLOYEES_LIST,
    payload: null,
  });
>>>>>>> d161a6f... manager page was added in route+additions to tslint config
};
