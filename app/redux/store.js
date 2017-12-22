import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './rootReducer';

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(promise(), thunk))
);
