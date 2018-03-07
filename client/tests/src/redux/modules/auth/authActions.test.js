import AUTH_ACTIONS from 'redux/modules/auth/actionConstants';
import * as actions from 'redux/modules/auth/actions';

describe('authActions', () => {
  test('Should login as employess', () => {
    const dispatchSpy = jest.fn();

    actions.loginAsEmployee()(dispatchSpy);

    expect(dispatchSpy.mock.calls[0][0].type).toEqual(AUTH_ACTIONS.LOGIN_AS_EMPLOYEE);
  });

  test('Should login as unit manager', () => {
    const dispatchSpy = jest.fn();

    actions.loginAsUnitManager()(dispatchSpy);

    expect(dispatchSpy.mock.calls[0][0].type).toEqual(AUTH_ACTIONS.LOGIN_AS_UNIT_MANAGER);
  });
});
