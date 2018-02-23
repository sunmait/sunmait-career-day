import {combineReducers} from 'redux';
import auth, {IAuthState} from './modules/auth/reducer';
import employees, {IEmployeesState} from './modules/employees/reducer';

const rootReducer = combineReducers<IStore>({
  auth,
  employees,
});

export default rootReducer;

export interface IStore {
  auth: IAuthState;
  employees: IEmployeesState;
}
