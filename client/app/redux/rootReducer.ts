import {combineReducers} from 'redux';
import auth, {IAuthState} from './modules/auth/authReducer';
export interface IRootState {
  auth: IAuthState;
}

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
