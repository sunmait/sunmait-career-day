import {createStore, applyMiddleware, Dispatch} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from 'redux/rootReducer';

export default interface IStore {
}

export type Dispatch = Dispatch<IStore>;

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(promise(), thunk))
);
