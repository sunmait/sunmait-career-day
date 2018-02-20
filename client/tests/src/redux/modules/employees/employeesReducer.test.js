import employeesReducer from 'redux/modules/employees/employeesReducer';
import EMPLOYEES_ACTION from 'redux/modules/employees/employeesActionConstants';

describe('employeesReducer', () => {
  test('Should return default state', () => {
    const initAction = {type: '', payload: {}};
    const defaultState = employeesReducer(undefined, initAction);

    expect(defaultState).toEqual({employees: null, careerDays: null, objectives: null, employeeFullName: null});
  });

  test('Should return list of employees', () => {
    const employees = {
      id: 1,
      Roles: '1',
      LastName: 'Tsvirko',
      FirstName: 'Alex',
      PhotoUrl: 'my-avatar',
      AccessToken: 'token',
    };

    const initAction = {type: EMPLOYEES_ACTION.GET_EMPLOYEES_LIST, payload: employees};
    const managerState = employeesReducer(undefined, initAction);

    expect(managerState).toEqual({employees, careerDays: null, objectives: null, employeeFullName: null});
  });

  test('Should return list of career day and employee full name', async () => {
    const payload = {
      careerDays: {
        id: 1,
        Archived: true,
        EmployeeExternalId: '1',
        UnitManagerExternalId: '1',
        InterviewDate: new Date(),
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
      },
      employeeFullName: 'Alex tsvirko'
    };

    const initAction = {type: EMPLOYEES_ACTION.GET_CAREER_DAYS, payload};
    const managerState = employeesReducer(undefined, initAction);

    expect(managerState).toEqual({
      careerDays: payload.careerDays,
      employees: null,
      objectives: null,
      employeeFullName: payload.employeeFullName,
    });
  });

  test('Should return list of objectives', () => {
    const objectives = {
      id: '1',
      Title: 'text',
      Description: 'descriptions',
      CareerDayId: '1',
      StatusId: '1',
      Progress: 1,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    };

    const initAction = {type: EMPLOYEES_ACTION.GET_OBJECTIVES, payload: objectives};
    const managerState = employeesReducer(undefined, initAction);

    expect(managerState).toEqual({objectives, employees: null, careerDays: null, employeeFullName: null});
  });
});