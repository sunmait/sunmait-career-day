import * as axios from 'axios';
import * as actions from 'redux/modules/employees/employeesAction';

describe('employeesActions', () => {
  describe('method sendRequest', () => {
    test('should send GET request to `/api/eamployee`', () => {
      const dispatchSpy = jest.fn();

      return actions.getEmployeesList()(dispatchSpy)
        .then(() => {
          const urlArg = axios.get.mock.calls[0][0];
          expect(urlArg).toBe('/api/employee');
        });
    });
  });
});
