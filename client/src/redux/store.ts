import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promise from 'redux-promise-middleware';
import thunk, { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { loadUser } from 'redux-oidc';
import createSagaMiddleware from 'redux-saga'
import rootReducer, { IStore, IAction } from './rootReducer';
import userManager from '../utils/oidcUserManager';
import rootSaga from './rootSaga';

interface IThunkExtraParams {}

export type Action<R> = ThunkAction<R, IStore, IThunkExtraParams, IAction>;

export type GetState = () => IStore;

export type Dispatch = ThunkDispatch<IStore, IThunkExtraParams, IAction>;

const sagaMiddleware = createSagaMiddleware();
const store: Store<IStore, IAction> = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(promise(), thunk, sagaMiddleware)),
);
sagaMiddleware.run(rootSaga);
loadUser(store, userManager);


export default store;
