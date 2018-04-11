import employeesReducer from 'redux/modules/employees/reducer';
import EMPLOYEES_LIST from 'redux/modules/employees/actionConstants';

describe('employeesReducer', () => {
  const employees = {
    id: 1,
    Roles: '1',
    LastName: 'Tsvirko',
    FirstName: 'Alex',
    PhotoUrl: 'my-avatar',
    AccessToken: 'dsjkhfsde76765.sduhg',
  };

  const careerDayOfEmployee = {
    id: 1,
    Archived: true,
    EmployeeId: '1',
    UnitManagerId: '1',
    InterviewDate: new Date(),
    CreatedAt: new Date(),
    UpdatedAt: new Date(),
    Objectives: [{id: 1}],
  };

  const objective = {
    id: 1,
    Title: 'Title',
    Description: 'Description',
    CareerDayId: 'CareerDayId',
    StatusId: 1,
    Progress: 0,
    CreatedAt: new Date,
    UpdatedAt: new Date,
  };

  describe('state with empty parameters', () => {
    test('Should return default state', () => {
      const initAction = {type: '', payload: {}};
      const defaultState = employeesReducer(undefined, initAction);

      expect(defaultState).toEqual({
        employees: null,
        careerDays: null,
        selectedCareerDay: null,
        selectedEmployee: null
      });
    });
  });

  describe('method handleGetEmployeesList', () => {
    test('Should return list of employees', () => {
      const initAction = {type: EMPLOYEES_LIST.GET_EMPLOYEES_LIST, payload: employees};
      const changedState = employeesReducer(undefined, initAction);

      expect(changedState).toEqual({employees, careerDays: null, selectedCareerDay: null, selectedEmployee: null});
    });
  });

  describe('method handleGetCareerDaysOfEmployee', () => {
    test('Should return list of career day', () => {
      const initAction = {type: EMPLOYEES_LIST.GET_CAREER_DAYS, payload: careerDayOfEmployee};
      const changedState = employeesReducer(undefined, initAction);

      expect(changedState).toEqual({
        employees: null,
        careerDays: initAction.payload,
        selectedCareerDay: null,
        selectedEmployee: null
      });
    });
  });

  describe('method handleGetActiveCareerDay', () => {
    test('Should return list of selected career day', () => {
      const initAction = {type: EMPLOYEES_LIST.GET_ACTIVE_CAREER_DAY, payload: careerDayOfEmployee};
      const changedState = employeesReducer(undefined, initAction);

      expect(changedState).toEqual({
        employees: null,
        careerDays: null,
        selectedCareerDay: initAction.payload,
        selectedEmployee: null
      });
    });
  });

  describe('method handleGetSelectedCareerDay', () => {
    test('Should return list of selected career day', () => {
      const initAction = {type: EMPLOYEES_LIST.GET_SELECTED_CAREER_DAY, payload: careerDayOfEmployee};
      const changedState = employeesReducer(undefined, initAction);

      expect(changedState).toEqual({
        employees: null,
        careerDays: null,
        selectedCareerDay: initAction.payload,
        selectedEmployee: null
      });
    });
  });

  describe('method handleGetSelectedEmployee', () => {
    test('Should return list of selected employees', () => {
      const initAction = {type: EMPLOYEES_LIST.GET_SELECTED_EMPLOYEE, payload: employees};
      const changedState = employeesReducer(undefined, initAction);

      expect(changedState).toEqual({
        employees: null,
        careerDays: null,
        selectedCareerDay: null,
        selectedEmployee: initAction.payload
      });
    });
  });

  describe('method handleAddCareerDay', () => {
    test('Should return updated list of career day after adding career day', () => {
      const initAction = {type: EMPLOYEES_LIST.ADD_CAREER_DAY, payload: careerDayOfEmployee};

      const changedState = employeesReducer({
        employees: null,
        careerDays: [],
        selectedCareerDay: null,
        selectedEmployee: null
      }, initAction);

      expect(changedState).toEqual({
        employees: null,
        careerDays: [initAction.payload],
        selectedCareerDay: null,
        selectedEmployee: null
      });
    });
  });

  describe('method handleAddObjective', () => {
    test('Should return updated list of career days after adding objective', () => {
      const initAction = {type: EMPLOYEES_LIST.ADD_OBJECTIVE, payload: objective};

      const changedState = employeesReducer({
        employees: null,
        careerDays: null,
        selectedCareerDay: initAction.payload,
        selectedEmployee: null
      }, initAction);

      expect(changedState).toEqual({
        employees: null,
        careerDays: null,
        selectedCareerDay: initAction.payload,
        selectedEmployee: null
      });
    });
  });

  describe('method handleDeleteCareerDay', () => {
    test('Should return updated list of career days after deleting career day ', () => {
      const initAction = {type: EMPLOYEES_LIST.DELETE_CAREER_DAY, payload: [careerDayOfEmployee]};

      const changedState = employeesReducer({
        employees: null,
        careerDays: initAction.payload,
        selectedCareerDay: null,
        selectedEmployee: null
      }, initAction);

      expect(changedState).toEqual({
        employees: null,
        careerDays: initAction.payload,
        selectedCareerDay: null,
        selectedEmployee: null
      });
    });
  });

  describe('method handleDeleteObjective', () => {
    test('Should return updated list of selected career day after deleting objective', () => {
      const initAction = {type: EMPLOYEES_LIST.DELETE_OBJECTIVE, payload: careerDayOfEmployee};

      const changedState = employeesReducer({
        employees: null,
        careerDays: null,
        selectedCareerDay: initAction.payload,
        selectedEmployee: null
      }, initAction);

      expect(changedState).toEqual({
        employees: null,
        careerDays: null,
        selectedCareerDay: initAction.payload,
        selectedEmployee: null
      });
    });
  });

  describe('method handleArchiveCareerDay', () => {
    test('Should return updated list of career days after archiving when it equal the current objective', () => {
      const initAction = {
        type: EMPLOYEES_LIST.ARCHIVE_CAREER_DAY,
        payload: {careerDay: [careerDayOfEmployee], selectedCareerDay: careerDayOfEmployee}
      };

      const changedState = employeesReducer({
        employees: null,
        careerDays: initAction.payload.careerDay,
        selectedCareerDay: initAction.payload.selectedCareerDay,
        selectedEmployee: null
      }, initAction);

      expect(changedState).toEqual({
        employees: null,
        careerDays: initAction.payload.careerDay,
        selectedCareerDay: initAction.payload.selectedCareerDay,
        selectedEmployee: null,
      });
    });
  });

  describe('method handleUpdateObjective', () => {
    test(
      'Should return updated list of career days after editing objective when it equal the current objective ',
      () => {
        const initAction = {type: EMPLOYEES_LIST.UPDATE_OBJECTIVE_MANAGER, payload: objective};

        const changedState = employeesReducer({
          employees: null,
          careerDays: null,
          selectedCareerDay: careerDayOfEmployee,
          selectedEmployee: null
        }, initAction);

        expect(changedState).toEqual({
          employees: null,
          careerDays: null,
          selectedCareerDay: careerDayOfEmployee,
          selectedEmployee: null,
        });
      });

    test(
      'Should return updated list of career days after editing objective when it not equal the current objective',
      () => {
        const objective = {
          id: 2,
        };

        const initAction = {type: EMPLOYEES_LIST.UPDATE_OBJECTIVE_EMPLOYEE, payload: objective};

        const changedState = employeesReducer({
          employees: null,
          careerDays: null,
          selectedCareerDay: careerDayOfEmployee,
          selectedEmployee: null
        }, initAction);

        expect(changedState).toEqual({
          employees: null,
          careerDays: null,
          selectedCareerDay: careerDayOfEmployee,
          selectedEmployee: null,
        });
      });
  });

  describe('method handleUpdateInterviewDatetime', () => {
    test('Should return updated current career day', () => {
      const initAction = {type: EMPLOYEES_LIST.UPDATE_INTERVIEW_DATETIME, payload: careerDayOfEmployee};

      const changedState = employeesReducer({
        employees: null,
        careerDays: null,
        selectedCareerDay: initAction.payload,
        selectedEmployee: null
      }, initAction);

      expect(changedState).toEqual({
        employees: null,
        careerDays: null,
        selectedCareerDay: initAction.payload,
        selectedEmployee: null,
      });
    });
  });
});
