import employeesReducer from 'redux/modules/employees/employeesReducer';
import EMPLOYEES_ACTION from 'redux/modules/employees/employeesActionConstants';

describe('employeesReducer', () => {
  test('Should return list of employees', () => {
    const profile = {
      id: 1,
      avatar: 'my-avatar',
      fullName: 'Alex Tsvirko',
      isActive: true,
    };

    const initAction = {type: EMPLOYEES_ACTION.GET_EMPLOYEES_LIST, payload: profile};
    const managerState = employeesReducer(undefined, initAction);

    expect(managerState).toEqual({profile: profile});
  });
});
