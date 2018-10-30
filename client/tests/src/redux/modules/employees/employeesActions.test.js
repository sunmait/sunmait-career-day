import EMPLOYEES_LIST from 'redux/modules/employees/actionConstants';
import * as actions from 'redux/modules/employees/actions';
import axios from 'axios';
import sendRequest from 'components/helper/authRequest';

jest.mock('components/helper/authRequest', () => jest.fn(() => Promise.resolve({status: 200, body: {}})));

describe('employees action', () => {
  beforeEach(() => {
    console.error = jest.fn((error) => {});
  });

  describe('method getEmployeesList', () => {
    test('should send GET request to `/api/employee`', () => {
      const dispatchSpy = jest.fn();

      return actions.getEmployeesList()(dispatchSpy)
        .then(() => {
          const expectedUrl = sendRequest.mock.calls[0][1];

          return expect(expectedUrl).toBe('/api/users/employees');
        });
    });

    test('should dispatch correct action in case of success response', () => {
      const dispatchSpy = jest.fn();

      return actions.getEmployeesList()(dispatchSpy)
        .then(() => {
          const type = dispatchSpy.mock.calls[0][0].type;

          return expect(type).toEqual(EMPLOYEES_LIST.GET_EMPLOYEES_LIST);
        });
    });
  });

  describe('method getCareerDayOfEmployee', () => {
    const employeeId = 123;

    test('should sent GET request to `/api/career-days/id`', () => {
      const dispatchSpy = jest.fn();

      return actions.getCareerDayOfEmployee(employeeId)(dispatchSpy)
        .then(() => {
          const expectedUrl = sendRequest.mock.calls[0][1];

          return expect(expectedUrl).toBe(`/api/career-days/${employeeId}`);
        });
    });

    test('should dispatch correct action in case of success response', () => {
      const dispatchSpy = jest.fn();

      return actions.getCareerDayOfEmployee(employeeId)(dispatchSpy)
        .then(() => {
          const type = dispatchSpy.mock.calls[0][0].type;

          return expect(type).toEqual(EMPLOYEES_LIST.GET_CAREER_DAYS);
        });
    });
  });

  describe('method getSelectedCareerDay', () => {
    const careerDayId = 1;

    test('should sent GET request to `/api/objectives/careerDayId`', () => {
      const dispatchSpy = jest.fn();

      return actions.getSelectedCareerDay(careerDayId)(dispatchSpy)
        .then(() => {
          const expectedUrl = sendRequest.mock.calls[0][1];

          return expect(expectedUrl).toBe(`/api/objectives/${careerDayId}`);
        });
    });

    test('should dispatch correct action in case of success response', () => {
      const dispatchSpy = jest.fn();

      return actions.getSelectedCareerDay(careerDayId)(dispatchSpy)
        .then(() => {
          const type = dispatchSpy.mock.calls[0][0].type;

          return expect(type).toEqual(EMPLOYEES_LIST.GET_SELECTED_CAREER_DAY)
        });
    });
  });

  describe('method getSelectedEmployee', () => {
    const employeeId = 123;

    test('should dispatch correct action', () => {
      const dispatchSpy = jest.fn();

      return actions.getSelectedEmployee(employeeId)(dispatchSpy)
        .then(() => {
          const type = dispatchSpy.mock.calls[0][0].type;

          expect(type).toEqual(EMPLOYEES_LIST.GET_SELECTED_EMPLOYEE);
        });
    });
  });

  describe('method addCareerDay', () => {
    const careerDay = {
      EmployeeId: 1,
      UnitManagerId: 1,
      InterviewDate: new Date(),
    };

    test('should sent POST request to `/api/career-days`', () => {
      const dispatchSpy = jest.fn();

      return actions.addCareerDay(careerDay)(dispatchSpy)
        .then(() => {
          const expectedUrl = sendRequest.mock.calls[0][1];

          return expect(expectedUrl).toBe('/api/career-days');
        });
    });

    test('should dispatch correct action in case of success response', () => {
      const dispatchSpy = jest.fn();

      return actions.addCareerDay(careerDay)(dispatchSpy)
        .then(() => {
          const type = dispatchSpy.mock.calls[0][0].type;

          return expect(type).toEqual(EMPLOYEES_LIST.ADD_CAREER_DAY);
        });
    });
  });

  describe('method addObjective', () => {
    const objective = {
      Title: 'objective',
      Description: 'description',
      CareerDayId: 1,
    };

    const fakeStore = {
      employees: {
        selectedCareerDay: {
          id: 1,
          Objectives: [],
        },
      },
    };

    test('should sent POST request to `/api/objectives`', () => {
      const dispatchSpy = jest.fn();

      return actions.addObjective(objective)(dispatchSpy, () => fakeStore)
        .then(() => {
          const expectedUrl = sendRequest.mock.calls[0][1];

          return expect(expectedUrl).toBe('/api/objectives');
        });
    });

    test('should dispatch correct action in case of success response', () => {
      const dispatchSpy = jest.fn();

      return actions.addObjective(objective)(dispatchSpy, () => fakeStore)
        .then(() => {
          const type = dispatchSpy.mock.calls[0][0].type;

          return expect(type).toEqual(EMPLOYEES_LIST.ADD_OBJECTIVE);
        });
    });
  });

  describe('method deleteCareerDay', () => {
    const careerDayId = 1;

    test('should sent DELETE request to `/api/career-days/careerDayId`', () => {
      const dispatchSpy = jest.fn();

      return actions.deleteCareerDay(careerDayId)(dispatchSpy)
        .then(() => {
          const expectedUrl = sendRequest.mock.calls[0][1];

          return expect(expectedUrl).toBe(`/api/career-days/${careerDayId}`);
        });
    });

    test('should dispatch correct action in case of success response', () => {
      const dispatchSpy = jest.fn();

      return actions.deleteCareerDay(careerDayId)(dispatchSpy)
        .then(() => {
          const type = dispatchSpy.mock.calls[0][0].type;

          return expect(type).toEqual(EMPLOYEES_LIST.DELETE_CAREER_DAY);
        });
    });
  });

  describe('method updateObjectiveManager', () => {
    const objective = {
      id: 1,
      title: 'title',
      description: 'description',
    };

    test('should sent PATCH request to `/api/objectives/id`', () => {
      const dispatchSpy = jest.fn();

      return actions.updateObjectiveManager(objective)(dispatchSpy)
        .then(() => {
          const expectedUrl = sendRequest.mock.calls[0][1];

          return expect(expectedUrl).toBe(`/api/objectives/${objective.id}`);
        });
    });

    test('should dispatch correct action in case of success response', () => {
      const dispatchSpy = jest.fn();

      return actions.updateObjectiveManager(objective)(dispatchSpy)
        .then(() => {
          const type = dispatchSpy.mock.calls[0][0].type;

          return expect(type).toEqual(EMPLOYEES_LIST.UPDATE_OBJECTIVE_MANAGER);
        });
    });
  });

  describe('method updateInterviewDate', () => {
    const careerDay = {
      id: 1,
      date: new Date(),
    }
    const fakeStore = {
      employees: {
        selectedCareerDay: { id: 1 },
      },
    };

    test('should sent PATCH request to `/api/career-days/update-date/id`', () => {
      const dispatchSpy = jest.fn();
      sendRequest.mockReturnValue(Promise.resolve({ data: {} }));

      return actions.updateInterviewDate(careerDay)(dispatchSpy, () => fakeStore)
        .then(() => {
          const expectedUrl = sendRequest.mock.calls[0][1];

          return expect(expectedUrl).toBe(`/api/career-days/update-date/${careerDay.id}`);
        });
    });

    test('should dispatch correct action in case of success response', () => {
      const dispatchSpy = jest.fn();
      sendRequest.mockReturnValue(Promise.resolve({ data: {} }));

      return actions.updateInterviewDate(careerDay)(dispatchSpy, () => fakeStore)
        .then(() => {
          const type = dispatchSpy.mock.calls[0][0].type;

          return expect(type).toEqual(EMPLOYEES_LIST.UPDATE_INTERVIEW_DATETIME);
        });
    });
  });

  describe('method archiveCareerDay', () => {
    const careerDay = { id: 1 };
    const fakeStore = {
      employees: { careerDays: [] },
    };

    test('should sent PATCH request to `/api/career-days/archive/careerDayId`', () => {
      const dispatchSpy = jest.fn();

      return actions.archiveCareerDay(careerDay)(dispatchSpy, () => fakeStore)
        .then(() => {
          const expectedUrl = sendRequest.mock.calls[0][1];

          return expect(expectedUrl).toBe(`/api/career-days/archive/${careerDay.id}`);
        });
    });

    test('should dispatch correct action in case of success response', () => {
      const dispatchSpy = jest.fn();

      return actions.archiveCareerDay(careerDay)(dispatchSpy, () => fakeStore)
        .then(() => {
          const type = dispatchSpy.mock.calls[0][0].type;

          return expect(type).toEqual(EMPLOYEES_LIST.ARCHIVE_CAREER_DAY);
        });
    });
  });

  describe('method deleteObjective', () => {
    const objectiveId = 1;
    const fakeStore = {
      employees: {
        selectedCareerDay: {
          id: 1,
          Objectives: [],
        },
      },
    };

    test('should sent DELETE request to `/api/objectives/objectiveId`', () => {
      const dispatchSpy = jest.fn();

      return actions.deleteObjective(objectiveId)(dispatchSpy, () => fakeStore)
        .then(() => {
          const expectedUrl = sendRequest.mock.calls[0][1];

          return expect(expectedUrl).toBe(`/api/objectives/${objectiveId}`);
        });
    });

    test('should dispatch correct action in case of success response', () => {
      const dispatchSpy = jest.fn();

      return actions.deleteObjective(objectiveId)(dispatchSpy, () => fakeStore)
        .then(() => {
          const type = dispatchSpy.mock.calls[0][0].type;

          return expect(type).toEqual(EMPLOYEES_LIST.DELETE_OBJECTIVE);
        });
    });
  });
});
