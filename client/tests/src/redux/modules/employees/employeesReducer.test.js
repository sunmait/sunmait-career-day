import employeesReducer from 'redux/modules/employees/reducer';
import EMPLOYEES_ACTION from 'redux/modules/employees/actionConstants';

describe('employeesReducer', () => {
  const employees = {
    id: 1,
    Roles: '1',
    LastName: 'Tsvirko',
    FirstName: 'Alex',
    PhotoUrl: 'my-avatar',
    AccessToken: 'token',
  };
  const payload = {
    id: 1,
    Archived: true,
    EmployeeExternalId: '1',
    UnitManagerExternalId: '1',
    InterviewDate: new Date(),
    CreatedAt: new Date(),
    UpdatedAt: new Date(),
    Objectives: {},
  };
  test('Should return default state', () => {
    const initAction = { type: '', payload: {} };
    const defaultState = employeesReducer(undefined, initAction);

    expect(defaultState).toEqual({ employees: null, careerDays: null, selectedCareerDay: null, selectedEmployee: null });
  });

  test('Should return list of employees', () => {
    const initAction = { type: EMPLOYEES_ACTION.GET_EMPLOYEES_LIST, payload: employees };
    const changedState = employeesReducer(undefined, initAction);

    expect(changedState).toEqual({ employees, careerDays: null, selectedCareerDay: null, selectedEmployee: null });
  });

  test('Should return list of career day', async () => {
    const initAction = { type: EMPLOYEES_ACTION.GET_CAREER_DAYS, payload };
    const changedState = employeesReducer(undefined, initAction);

    expect(changedState).toEqual({ employees: null, careerDays: payload, selectedCareerDay: null, selectedEmployee: null });
  });

  test('Should return list of selected career day', async () => {
    const initAction = { type: EMPLOYEES_ACTION.GET_SELECTED_CAREER_DAY, payload };
    const changedState = employeesReducer(undefined, initAction);

    expect(changedState).toEqual({ employees: null, careerDays: null, selectedCareerDay: payload, selectedEmployee: null });
  });

  test('Should return list of selected empployees', async () => {
    const initAction = { type: EMPLOYEES_ACTION.GET_SELECTED_EMPLOYEE, payload: employees };
    const changedState = employeesReducer(undefined, initAction);

    expect(changedState).toEqual({ employees: null, careerDays: null, selectedCareerDay: null, selectedEmployee: employees });
  });

  test('Should return updated list of career date', async () => {
    const initAction = { type: EMPLOYEES_ACTION.ADD_CAREER_DAY, payload };
    const changedState = employeesReducer({ 
      employees: null,
      careerDays: [],
      selectedCareerDay: null,
      selectedEmployee: null
    }, initAction);

    expect(changedState).toEqual({ employees: null, careerDays: [payload], selectedCareerDay: null, selectedEmployee: null });
  });
});
