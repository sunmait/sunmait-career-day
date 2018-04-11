import authReducer from 'redux/modules/auth/reducer.ts';
import AUTH_ACTIONS from 'redux/modules/auth/actionConstants';

const data = {
  AccessToken: 'dasfsrgb.dfgd',
  RefreshToken: 'dsefregh7rfgjrheg',
  Data: {
    FirstName: "Kirill",
    LastName: "Stasevich",
    PhotoUrl: "https://vk.com/images/camera_200.png",
    Roles: "manager",
    id: 4,
  },
};

describe('authReducer', () => {
  test('should return default state', () => {
    const initAction = {type: '', payload: {}};
    const defaultState = authReducer(undefined, initAction);

    expect(defaultState).toEqual({user: null, accessToken: null, refreshToken: null});
  });

  describe('method handleLogin', () => {
    test('should return user and tokens when login was first enter', () => {
      const initAction = {type: AUTH_ACTIONS.LOGIN, payload: data};
      const managerState = authReducer(undefined, initAction);

      expect(managerState).toEqual({
        user: initAction.payload.Data,
        accessToken: initAction.payload.AccessToken,
        refreshToken: initAction.payload.RefreshToken,
      });
    });

    test('should return user and tokens when tokens was expired', () => {
      const initAction = {type: AUTH_ACTIONS.REFRESH_TOKEN_EXPIRED, payload: data};
      const managerState = authReducer(undefined, initAction);

      expect(managerState).toEqual({
        user: initAction.payload.Data,
        accessToken: initAction.payload.AccessToken,
        refreshToken: initAction.payload.RefreshToken,
      });
    });
  });

  describe('method handleLogout', () => {
    test('should return all fields of state with null type', () => {
      const initAction = {type: AUTH_ACTIONS.LOGOUT, payload: data};
      const managerState = authReducer(undefined, initAction);

      expect(managerState).toEqual({
        user: null,
        accessToken: null,
        refreshToken: null,
      });
    });
  });

  describe('method handleAccessTokenExpired', () => {
    test('should return access and refresh tokens', () => {
      const initAction = {type: AUTH_ACTIONS.ACCESS_TOKEN_EXPIRED, payload: data};
      const managerState = authReducer(undefined, initAction);

      expect(managerState).toEqual({
        user: null,
        accessToken: data.AccessToken,
        refreshToken: data.RefreshToken,
      });
    });
  });
});
