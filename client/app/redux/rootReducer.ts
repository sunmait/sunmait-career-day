import {combineReducers} from 'redux';
import auth, {IAuthState} from './modules/auth/authReducer';
import employees, {IEmployeesState} from './modules/employees/employeesReducer';

export interface IRootState {
  auth: IAuthState;
  employees: IEmployeesState;
}

const rootReducer = combineReducers({
  auth,
  employees,
});

export default rootReducer;
