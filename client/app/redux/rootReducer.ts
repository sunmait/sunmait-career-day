import { combineReducers } from 'redux';
import auth, { IAuthState } from './modules/auth/reducer';
import employees, { IEmployeesState } from './modules/employees/reducer';
import app, { IAppState } from './modules/app/reducer';

const rootReducer = combineReducers<IStore>({
  app,
  auth,
  employees,
});

export default rootReducer;

export interface IStore {
  app: IAppState;
  auth: IAuthState;
  employees: IEmployeesState;
}
