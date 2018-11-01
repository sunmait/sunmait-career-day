import authReducer from '../../../../../redux/modules/auth/reducer.ts';
import AUTH_ACTIONS from '../../../../../redux/modules/auth/actionConstants';
import { ROLES } from '../../../../../redux/modules/auth/constants';

describe('authReducer', () => {
  test('Should return default state', () => {
    const initAction = { type: '', payload: {} };
    const defaultState = authReducer(undefined, initAction);

    expect(defaultState).toEqual({
      user: null,
      accessToken: null,
      refreshToken: null,
    });
  });

  describe(`action ${AUTH_ACTIONS.LOGIN}`, () => {
    const createAction = payload => ({
      type: AUTH_ACTIONS.LOGIN,
      payload,
    });

    test('Should set correct user in state', () => {
      const user = {
        role: ROLES.UNIT_MANAGER,
        fullName: 'Alex Denisenko',
      };
      const payload = { Data: user };

      const state = authReducer(undefined, createAction(payload));

      expect(state).toHaveProperty('user', user);
    });

    test('Should set correct accessToken in state', () => {
      const accessToken = 'someAccessToken';
      const payload = { AccessToken: accessToken };

      const state = authReducer(undefined, createAction(payload));

      expect(state).toHaveProperty('accessToken', accessToken);
    });

    test('Should set correct refreshToken in state', () => {
      const refreshToken = 'someRefreshToken';
      const payload = { RefreshToken: refreshToken };

      const state = authReducer(undefined, createAction(payload));

      expect(state).toHaveProperty('refreshToken', refreshToken);
    });
  });

  describe(`action ${AUTH_ACTIONS.LOGOUT}`, () => {
    let stateBefore = {};
    const createAction = () => ({
      type: AUTH_ACTIONS.LOGOUT,
    });

    beforeEach(() => {
      stateBefore = {
        user: { some: 'user' },
        accessToken: 'someAccessToken',
        refreshToken: 'someRefreshToken',
      };
    });

    test('Should set user to null', () => {
      const state = authReducer(stateBefore, createAction());

      expect(state).toHaveProperty('user', null);
    });

    test('Should set accessToken to null', () => {
      const state = authReducer(stateBefore, createAction());

      expect(state).toHaveProperty('accessToken', null);
    });

    test('Should set refreshToken to null', () => {
      const state = authReducer(stateBefore, createAction());

      expect(state).toHaveProperty('refreshToken', null);
    });
  });
});
