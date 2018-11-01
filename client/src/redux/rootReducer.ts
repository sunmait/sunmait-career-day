import { IAction } from './rootReducer';
import { combineReducers } from 'redux';
import auth, { IAuthState, IAuthAction } from './modules/auth/reducer';
import employees, { IEmployeesState, IEmployeesAction } from './modules/employees/reducer';
import app, { IAppState, IAppAction } from './modules/app/reducer';

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

export type IAction = IAuthAction | IEmployeesAction | IAppAction;
