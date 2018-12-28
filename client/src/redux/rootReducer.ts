import { IAction } from './rootReducer';
import { combineReducers } from 'redux';
import employees, {
  IEmployeesState,
  IEmployeesAction,
} from './modules/employees/reducer';
import app, { IAppState, IAppAction } from './modules/app/reducer';
import oidc, { IOidcState } from './modules/oidc/reducer';

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

export type IAction = IEmployeesAction | IAppAction;
