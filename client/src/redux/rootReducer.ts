import { ActionType } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { IAction } from './rootReducer';
import employees, { IEmployeesAction } from './modules/employees/reducer';
import app from './modules/app/reducer';
import oidc from './modules/oidc/reducer';
import * as appActions from './modules/app/actions';

const rootReducer = combineReducers({
  app,
  employees,
  oidc,
});

export default rootReducer;

export type IStore = ReturnType<typeof rootReducer>;

export type IAction = IEmployeesAction | ActionType<typeof appActions>;
