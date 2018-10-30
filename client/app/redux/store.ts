import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promise from 'redux-promise-middleware';
import thunk, { ThunkDispatch, ThunkAction } from 'redux-thunk';
import rootReducer, { IStore } from './rootReducer';
import APP_ACTIONS from './modules/app/actionConstants';
import AUTH_ACTIONS from './modules/auth/actionConstants';
import EMPLOYEES_LIST from './modules/employees/actionConstants';

interface IAction {
  type: APP_ACTIONS | AUTH_ACTIONS | EMPLOYEES_LIST;
}

interface IThunkExtraParams {}

export type Action<R> = ThunkAction<R, IStore, IThunkExtraParams, IAction>;

export type Dispatch = ThunkDispatch<IStore, IThunkExtraParams, IAction>;

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(promise(), thunk)),
);
