import * as actions from 'redux/modules/auth/actions';
import axios from 'axios';
import userRoleHelper from 'components/helper/userRoleHelper.ts';

describe('User role helper', () => {
  test('should return true if auth as manager', () => {
    const dispatchSpy = jest.fn();

    const params = {
      Email: 'tsv@gmail.com',
      Password: '123456',
    };

    // const user = userRoleHelper(dispatchSpy.mock.calls[0][0].payload);
    //
    // expect(user).toEqual(true);
  });
});
