import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promise from 'redux-promise-middleware';
import thunk, { ThunkDispatch, ThunkAction } from 'redux-thunk';
import rootReducer, { IStore, IAction } from './rootReducer';

interface IThunkExtraParams {}

export type Action<R> = ThunkAction<R, IStore, IThunkExtraParams, IAction>;

export type GetState = () => IStore;

export type Dispatch = ThunkDispatch<IStore, IThunkExtraParams, IAction>;

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(promise(), thunk)),
);
