import { ROLES } from '../../../../redux/modules/auth/constants';
import * as userRoleHelper from '../../../../components/helper/userRoleHelper.ts';

describe('User role helper', () => {
  describe('isAuthAsManager method', () => {
    test('should return true if user role is manager', () => {
      const user = { Role: ROLES.UNIT_MANAGER };

      const result = userRoleHelper.isAuthAsManager(user);

      expect(result).toEqual(true);
    });

    test('should return false if user role is not manager', () => {
      const user = { Role: 'randomRole' };

      const result = userRoleHelper.isAuthAsManager(user);

      expect(result).toEqual(false);
    });
  });

  describe('isAuthAsEmployee method', () => {
    test('should return true if user role is emploee', () => {
      const user = { Role: ROLES.EMPLOYEE };

      const result = userRoleHelper.isAuthAsEmployee(user);

      expect(result).toEqual(true);
    });

    test('should return false if user role is not emploee', () => {
      const user = { Role: 'randomRole' };

      const result = userRoleHelper.isAuthAsEmployee(user);

      expect(result).toEqual(false);
    });
  });
});
