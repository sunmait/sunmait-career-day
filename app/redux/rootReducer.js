import {combineReducers} from 'redux';
import main from './modules/main/mainReducer';

const rootReducer = combineReducers({
  main
});

export default rootReducer;
