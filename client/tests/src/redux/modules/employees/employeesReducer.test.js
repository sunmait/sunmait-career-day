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

  const careerDayOfEmployee = {
    id: 1,
    Archived: true,
    EmployeeExternalId: '1',
    UnitManagerExternalId: '1',
    InterviewDate: new Date(),
    CreatedAt: new Date(),
    UpdatedAt: new Date(),
    Objectives: [],
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
      const initAction = {type: EMPLOYEES_ACTION.GET_EMPLOYEES_LIST, payload: employees};
      const changedState = employeesReducer(undefined, initAction);

      expect(changedState).toEqual({employees, careerDays: null, selectedCareerDay: null, selectedEmployee: null});
    });
  });

  describe('method handleGetCareerDaysOfEmployee', () => {
    test('Should return list of career day', () => {
      const initAction = {type: EMPLOYEES_ACTION.GET_CAREER_DAYS, payload: careerDayOfEmployee};
      const changedState = employeesReducer(undefined, initAction);

      expect(changedState).toEqual({
        employees: null,
        careerDays: careerDayOfEmployee,
        selectedCareerDay: null,
        selectedEmployee: null
      });
    });
  });

  describe('method handleGetSelectedCareerDay', () => {
    test('Should return list of selected career day', () => {
      const initAction = {type: EMPLOYEES_ACTION.GET_SELECTED_CAREER_DAY, payload: careerDayOfEmployee};
      const changedState = employeesReducer(undefined, initAction);

      expect(changedState).toEqual({
        employees: null,
        careerDays: null,
        selectedCareerDay: careerDayOfEmployee,
        selectedEmployee: null
      });
    });
  });

  describe('method handleGetSelectedEmployee', () => {
    test('Should return list of selected employees', () => {
      const initAction = {type: EMPLOYEES_ACTION.GET_SELECTED_EMPLOYEE, payload: employees};
      const changedState = employeesReducer(undefined, initAction);

      expect(changedState).toEqual({
        employees: null,
        careerDays: null,
        selectedCareerDay: null,
        selectedEmployee: employees
      });
    });
  });

  describe('method handleAddCareerDay', () => {
    test('Should return updated list of career day after adding career day', () => {
      const initAction = {type: EMPLOYEES_ACTION.ADD_CAREER_DAY, payload: careerDayOfEmployee};

      const changedState = employeesReducer({
        employees: null,
        careerDays: [],
        selectedCareerDay: null,
        selectedEmployee: null
      }, initAction);

      expect(changedState).toEqual({
        employees: null,
        careerDays: [careerDayOfEmployee],
        selectedCareerDay: null,
        selectedEmployee: null
      });
    });
  });

  describe('method handleAddObjective', () => {
    test('Should return updated list of xareer days after adding objective', () => {
      const initAction = {type: EMPLOYEES_ACTION.ADD_OBJECTIVE, payload: objective};

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
        selectedEmployee: null
      });
    });
  });

  describe('method handleDeleteCareerDay', () => {
    test('Should return updated list of career days after deleting career day ', () => {
      const careerDayId = 1;
      const initAction = {type: EMPLOYEES_ACTION.DELETE_CAREER_DAY, payload: careerDayId};

      const changedState = employeesReducer({
        employees: null,
        careerDays: [careerDayOfEmployee],
        selectedCareerDay: null,
        selectedEmployee: null
      }, initAction);

      expect(changedState).toEqual({
        employees: null,
        careerDays: [],
        selectedCareerDay: null,
        selectedEmployee: null
      });
    });
  });

  describe('method handleUpdateInterviewDatetime', () => {
    test('Should return updated current career day', () => {
      const initAction = {type: EMPLOYEES_ACTION.UPDATE_INTERVIEW_DATETIME, payload: careerDayOfEmployee};

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

  describe('method handleUpdateObjective', () => {
    test(
      'Should return updated list of career days after editing objective when it equal the current objective ',
      () => {
        const initAction = {type: EMPLOYEES_ACTION.UPDATE_OBJECTIVE, payload: objective};

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
          Title: 'Title',
          Description: 'Description',
          CareerDayId: 'CareerDayId',
          StatusId: 1,
          Progress: 0,
          CreatedAt: new Date,
          UpdatedAt: new Date,
        };

        const initAction = {type: EMPLOYEES_ACTION.UPDATE_OBJECTIVE, payload: objective};

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

  describe('method  handleDeleteObjective', () => {
    test(
      'Should return updated list of selected career days after deleting objective when it not equal the current objective',
      () => {
        const objectiveId = 2;

        const initAction = {type: EMPLOYEES_ACTION.DELETE_OBJECTIVE, payload: objectiveId};

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
      'Should return updated list of selected career days after deleting objective when it equal the current objective',
      () => {
        const objectiveId = 1;
        const initAction = {type: EMPLOYEES_ACTION.DELETE_OBJECTIVE, payload: objectiveId};

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

  describe('method handleArchiveCareerDay', () => {
    test('Should return updated list of career days after archiving when it equal the current objective', () => {
      const initAction = {type: EMPLOYEES_ACTION.ARCHIVE_CAREER_DAY, payload: careerDayOfEmployee};

      const changedState = employeesReducer({
        employees: null,
        careerDays: [careerDayOfEmployee],
        selectedCareerDay: careerDayOfEmployee,
        selectedEmployee: null
      }, initAction);

      expect(changedState).toEqual({
        employees: null,
        careerDays: [careerDayOfEmployee],
        selectedCareerDay: careerDayOfEmployee,
        selectedEmployee: null,
      });
    });

    test('Should return updated list of career days  after archiving when it not equal the current objective', () => {
      const notEqualCareerDayOfEmployee = {
        id: 2,
        Archived: true,
        EmployeeExternalId: '1',
        UnitManagerExternalId: '1',
        InterviewDate: new Date(),
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
        Objectives: [],
      };

      const initAction = {type: EMPLOYEES_ACTION.ARCHIVE_CAREER_DAY, payload: notEqualCareerDayOfEmployee};

      const changedState = employeesReducer({
        employees: null,
        careerDays: [careerDayOfEmployee],
        selectedCareerDay: notEqualCareerDayOfEmployee,
        selectedEmployee: null
      }, initAction);

      expect(changedState).toEqual({
        employees: null,
        careerDays: [careerDayOfEmployee],
        selectedCareerDay: notEqualCareerDayOfEmployee,
        selectedEmployee: null,
      });
    });
  });
});
