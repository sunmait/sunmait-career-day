import * as actions from 'redux/modules/auth/authActions';
import userRoleHelper from 'components/helper/userRoleHelper';

describe('User role helper', () => {
  test('should return true if auth as manager', () => {
    const dispatchSpy = jest.fn();
    actions.loginAsUnitManager()(dispatchSpy);

    const user = userRoleHelper(dispatchSpy.mock.calls[0][0].payload);

    expect(user).toEqual(true);
  });
});
