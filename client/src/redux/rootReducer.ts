
import { ActionType } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { IAction } from './rootReducer';
import employees, { IEmployeesState, IEmployeesAction } from './modules/employees/reducer';
import app, { IAppState } from './modules/app/reducer';
import oidc, { IOidcState } from './modules/oidc/reducer';
import * as appActions from './modules/app/actions';

const rootReducer = combineReducers<IStore>({
  app,
  employees,
  oidc,
});

export default rootReducer;

export interface IStore {
  app: IAppState;
  employees: IEmployeesState;
  oidc: IOidcState;
}

export type IAction = IEmployeesAction | ActionType<typeof appActions>;
