import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promise from 'redux-promise-middleware';
import thunk, { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { loadUser } from 'redux-oidc';
import rootReducer, { IStore, IAction } from './rootReducer';
import userManager from '../utils/oidcUserManager';

interface IThunkExtraParams {}

export type Action<R> = ThunkAction<R, IStore, IThunkExtraParams, IAction>;

export type GetState = () => IStore;

export type Dispatch = ThunkDispatch<IStore, IThunkExtraParams, IAction>;

const store: Store<IStore, IAction> = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(promise(), thunk)),
);
loadUser(store, userManager);

export default store;
