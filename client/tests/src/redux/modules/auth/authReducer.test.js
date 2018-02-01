import authReducer from 'redux/modules/auth/authReducer.ts';
import AUTH_ACTIONS from 'redux/modules/auth/authActionConstants';
import {ROLES} from 'redux/modules/auth/authConstants';

describe('authReducer', () => {
  test('Should return default state', () => {
    const initAction = {type: '', payload: {}};
    const defaultState = authReducer(undefined, initAction);

    expect(defaultState).toEqual({user: null});
  });

  test('Should return correct type', () => {
    const user = {
      role: ROLES.UNIT_MANAGER,
      fullName: 'Alex Denisenko',
    };

    const initAction = {type: AUTH_ACTIONS.LOGIN_AS_UNIT_MANAGER, payload: user};
    const managerState = authReducer(undefined, initAction);

    expect(managerState).toEqual({user: user});

  });
});
