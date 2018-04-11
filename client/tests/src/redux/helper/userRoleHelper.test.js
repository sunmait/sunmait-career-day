import { isAuthAsManager, isAuthAsEmployee } from 'components/helper/userRoleHelper.ts';

describe('User role helper', () => {
  test('should return true if user is manager', () => {
    const user = {
      Role: 'manager',
    };
    const manager = isAuthAsManager(user);

    expect(manager).toEqual(true);
  });

  test('should return true if user is employee', () => {
    const user = {
      Role: 'employee',
    };
    const employee = isAuthAsEmployee(user);

    expect(employee).toEqual(true);
  });
});
