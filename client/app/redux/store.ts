import {applyMiddleware, createStore, Dispatch} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import rootReducer from 'redux/rootReducer';
import {IStore} from './rootReducer';

export type Dispatch = Dispatch<IStore>;

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(promise(), thunk)),
);
