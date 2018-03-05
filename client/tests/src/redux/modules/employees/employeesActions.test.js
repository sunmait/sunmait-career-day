import EMPLOYEES_LIST from 'redux/modules/employees/actionConstants';
import * as actions from 'redux/modules/employees/actions';
import axios from 'axios';

describe('employees action', () => {
  beforeEach(() => {
    axios.get.mockReturnValue(Promise.resolve({status: 200, body: {}}));
    axios.post.mockReturnValue(Promise.resolve({status: 200, body: {}}));
    axios.delete.mockReturnValue(Promise.resolve({status: 200, body: {}}));
    axios.patch.mockReturnValue(Promise.resolve({status: 200, body: {}}));

    console.error = jest.fn((error) => {

    });
  });

  describe('method getEmployeesList', () => {
    test('should send GET request to `/api/employee`', () => {
      const dispatchSpy = jest.fn();

      return actions.getEmployeesList()(dispatchSpy)
        .then(() => {
          const expectedUrl = axios.get.mock.calls[0][0];

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

    test('should dispatch correct payload in case of success response', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 200,
      };

      return actions.getEmployeesList()(dispatchSpy)
        .then(() => expect(axios.get()).resolves.toEqual(fakeResponse));
    });

    test('should return rejected promise in case of error in request', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 500,
      };

      axios.get.mockReturnValue(Promise.reject(fakeResponse));

      return actions.getEmployeesList()(dispatchSpy)
        .then(() => expect(axios.get()).rejects.toEqual(fakeResponse));
    });
  });

  describe('method getCareerDayOfEmployee', () => {
    const employee = {
      id: 1,
      Roles: '1',
      LastName: 'Tsvirko',
      FirstName: 'Alex',
      PhotoUrl: 'my-avatar',
      AccessToken: 'token',
    };

    test('should sent GET request to `/api/career-days/id`', () => {
      const dispatchSpy = jest.fn();

      return actions.getCareerDayOfEmployee(employee)(dispatchSpy)
        .then(() => {
          const expectedUrl = axios.get.mock.calls[0][0];

          return expect(expectedUrl).toBe(`/api/career-days/${employee.id}`);
        });
    });

    test('should dispatch correct action in case of success response', () => {
      const dispatchSpy = jest.fn();

      return actions.getCareerDayOfEmployee(employee)(dispatchSpy)
        .then(() => {
          const type = dispatchSpy.mock.calls[0][0].type;

          return expect(type).toEqual(EMPLOYEES_LIST.GET_CAREER_DAYS);
        });
    });

    test('should dispatch correct payload in case of success response', () => {
      const fakeResponse = {
        body: {},
        status: 200,
      };
      const dispatchSpy = jest.fn();

      return actions.getCareerDayOfEmployee(employee)(dispatchSpy)
        .then(() => expect(axios.get()).resolves.toEqual(fakeResponse));
    });

    test('should return rejected promise in case of error in request', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 500,
      };

      axios.get.mockReturnValue(Promise.reject(fakeResponse));

      return actions.getCareerDayOfEmployee(employee)(dispatchSpy)
        .then(() => expect(axios.get()).rejects.toEqual(fakeResponse));
    });
  });

  describe('method getSelectedCareerDay', () => {
    const careerDayId = 1;

    test('should sent GET request to `/api/objectives/careerDayId`', () => {
      const dispatchSpy = jest.fn();

      return actions.getSelectedCareerDay(careerDayId)(dispatchSpy)
        .then(() => {
          const expectedUrl = axios.get.mock.calls[0][0];

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

    test('should dispatch correct payload in case of success response', () => {
      const fakeResponse = {
        body: {},
        status: 200,
      };
      const dispatchSpy = jest.fn();

      return actions.getSelectedCareerDay(careerDayId)(dispatchSpy)
        .then(() => expect(axios.get()).resolves.toEqual(fakeResponse));
    });

    test('should return rejected promise in case of error in request', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 500,
      };

      axios.get.mockReturnValue(Promise.reject(fakeResponse));

      return actions.getSelectedCareerDay(careerDayId)(dispatchSpy)
        .then(() => expect(axios.get()).rejects.toEqual(fakeResponse));
    });
  });

  describe('method getSelectedEmployee', () => {
    const employee = {
      id: 1,
      Roles: '1',
      LastName: 'Tsvirko',
      FirstName: 'Alex',
      PhotoUrl: 'my-avatar',
      AccessToken: 'token',
    };

    test('should dispatch correct action', () => {
      const dispatchSpy = jest.fn();

      actions.getSelectedEmployee(employee)(dispatchSpy);
      const type = dispatchSpy.mock.calls[0][0].type;

      expect(type).toEqual(EMPLOYEES_LIST.GET_SELECTED_EMPLOYEE);
    });

    test('should dispatch correct payload', () => {
      const dispatchSpy = jest.fn();

      actions.getSelectedEmployee(employee)(dispatchSpy);
      const returnedData = dispatchSpy.mock.calls[0][0].payload;

      expect(returnedData).toEqual(employee);
    });
  });

  describe('method addCareerDay', () => {
    const careerDay = {
      EmployeeExternalId: 1,
      UnitManagerExternalId: 1,
      InterviewDate: new Date(),
    };

    test('should sent POST request to `/api/career-days`', () => {
      const dispatchSpy = jest.fn();

      return actions.addCareerDay(careerDay)(dispatchSpy)
        .then(() => {
          const expectedUrl = axios.post.mock.calls[0][0];

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

    test('should dispatch correct payload in case of success response', () => {
      const fakeResponse = {
        body: {},
        status: 200,
      };
      const dispatchSpy = jest.fn();

      return actions.addCareerDay(careerDay)(dispatchSpy)
        .then(() => expect(axios.post()).resolves.toEqual(fakeResponse));
    });

    test('should return rejected promise in case of error in request', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 500,
      };

      axios.post.mockReturnValue(Promise.reject(fakeResponse));

      return actions.addCareerDay(careerDay)(dispatchSpy)
        .then(() => expect(axios.post()).rejects.toEqual(fakeResponse));
    });
  });

  describe('method addObjective', () => {
    const objective = {
      Title: 'objective',
      Description: 'description',
      CareerDayId: 1,
    };

    test('should sent POST request to `/api/objectives`', () => {
      const dispatchSpy = jest.fn();

      return actions.addObjective(objective)(dispatchSpy)
        .then(() => {
          const expectedUrl = axios.post.mock.calls[0][0];

          return expect(expectedUrl).toBe('/api/objectives');
        });
    });

    test('should dispatch correct action in case of success response', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 200,
      };

      return actions.addObjective(objective)(dispatchSpy)
        .then(() => {
          const type = dispatchSpy.mock.calls[0][0].type;

          return expect(type).toEqual(EMPLOYEES_LIST.ADD_OBJECTIVE);
        });
    });

    test('should dispatch correct payload in case of success response', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 200,
      };

      return actions.addObjective(objective)(dispatchSpy)
        .then(() => expect(axios.post()).resolves.toEqual(fakeResponse));
    });

    test('should return rejected promise in case of error in request', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 500,
      };

      axios.post.mockReturnValue(Promise.reject(fakeResponse));

      return actions.addObjective(objective)(dispatchSpy)
        .then(() => expect(axios.post()).rejects.toEqual(fakeResponse));
    });
  });

  describe('method deleteCareerDay', () => {
    const careerDayId = 1;

    test('should sent DELETE request to `/api/career-days/careerDayId`', () => {
      const dispatchSpy = jest.fn();

      return actions.deleteCareerDay(careerDayId)(dispatchSpy)
        .then(() => {
          const expectedUrl = axios.delete.mock.calls[0][0];

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

    test('should dispatch correct payload in case of success response', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 200,
      };

      return actions.deleteCareerDay(careerDayId)(dispatchSpy)
        .then(() => expect(axios.delete()).resolves.toEqual(fakeResponse));
    });

    test('should return rejected promise in case of error in request', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 500,
      };

      axios.delete.mockReturnValue(Promise.reject(fakeResponse));

      return actions.deleteCareerDay(careerDayId)(dispatchSpy)
        .then(() => expect(axios.delete()).rejects.toEqual(fakeResponse));
    });
  });

  describe('method updateObjective', () => {
    const objective = {
      id: 1,
      title: 'title',
      description: 'description',
    };

    test('should sent PATCH request to `/api/objectives/id`', () => {
      const dispatchSpy = jest.fn();

      return actions.updateObjective(objective)(dispatchSpy)
        .then(() => {
          const expectedUrl = axios.patch.mock.calls[0][0];

          return expect(expectedUrl).toBe(`/api/objectives/${objective.id}`);
        });
    });

    test('should dispatch correct action in case of success response', () => {
      const dispatchSpy = jest.fn();

      return actions.updateObjective(objective)(dispatchSpy)
        .then(() => {
          const type = dispatchSpy.mock.calls[0][0].type;

          return expect(type).toEqual(EMPLOYEES_LIST.UPDATE_OBJECTIVE);
        });
    });

    test('should dispatch correct payload in case of success response', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 200,
      };

      return actions.updateObjective(objective)(dispatchSpy)
        .then(() => expect(axios.patch()).resolves.toEqual(fakeResponse));
    });

    test('should return rejected promise in case of error in request', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 500,
      };

      axios.patch.mockReturnValue(Promise.reject(fakeResponse));

      return actions.updateObjective(objective)(dispatchSpy)
        .then(() => expect(axios.patch()).rejects.toEqual(fakeResponse));
    });
  });

  describe('method updateInterviewDatetime', () => {
    const careerDay = {
      id: 1,
      date: new Date(),
    }

    test('should sent PATCH request to `/api/career-days/update-date/id`', () => {
      const dispatchSpy = jest.fn();

      return actions.updateInterviewDatetime(careerDay)(dispatchSpy)
        .then(() => {
          const expectedUrl = axios.patch.mock.calls[0][0];

          return expect(expectedUrl).toBe(`/api/career-days/update-date/${careerDay.id}`);
        });
    });

    test('should dispatch correct action in case of success response', () => {
      const dispatchSpy = jest.fn();

      return actions.updateInterviewDatetime(careerDay)(dispatchSpy)
        .then(() => {
          const type = dispatchSpy.mock.calls[0][0].type;

          return expect(type).toEqual(EMPLOYEES_LIST.UPDATE_INTERVIEW_DATETIME);
        });
    });

    test('should dispatch correct payload in case of success response', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 200,
      };

      return actions.updateInterviewDatetime(careerDay)(dispatchSpy)
        .then(() => expect(axios.patch()).resolves.toEqual(fakeResponse));
    });

    test('should return rejected promise in case of error in request', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 500,
      };

      axios.patch.mockReturnValue(Promise.reject(fakeResponse));

      return actions.updateInterviewDatetime(careerDay)(dispatchSpy)
        .then(() => expect(axios.patch()).rejects.toEqual(fakeResponse));
    });
  });

  describe('method archiveCareerDay', () => {
    const careerDayId = 1;

    test('should sent PATCH request to `/api/career-days/archive/careerDayId`', () => {
      const dispatchSpy = jest.fn();

      return actions.archiveCareerDay(careerDayId)(dispatchSpy)
        .then(() => {
          const expectedUrl = axios.patch.mock.calls[0][0];

          return expect(expectedUrl).toBe(`/api/career-days/archive/${careerDayId}`);
        });
    });

    test('should dispatch correct action in case of success response', () => {
      const dispatchSpy = jest.fn();

      return actions.archiveCareerDay(careerDayId)(dispatchSpy)
        .then(() => {
          const type = dispatchSpy.mock.calls[0][0].type;

          return expect(type).toEqual(EMPLOYEES_LIST.ARCHIVE_CAREER_DAY);
        });
    });

    test('should dispatch correct payload in case of success response', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 200,
      };

      return actions.archiveCareerDay(careerDayId)(dispatchSpy)
        .then(() => expect(axios.patch()).resolves.toEqual(fakeResponse));
    });

    test('should return rejected promise in case of error in request', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 500,
      };

      axios.patch.mockReturnValue(Promise.reject(fakeResponse));

      return actions.archiveCareerDay(careerDayId)(dispatchSpy)
        .then(() => expect(axios.patch()).rejects.toEqual(fakeResponse));
    });
  });

  describe('method deleteObjective', () => {
    const objectiveId = 1;

    test('should sent DELETE request to `/api/objectives/objectiveId`', () => {
      const dispatchSpy = jest.fn();

      return actions.deleteObjective(objectiveId)(dispatchSpy)
        .then(() => {
          const expectedUrl = axios.delete.mock.calls[0][0];

          return expect(expectedUrl).toBe(`/api/objectives/${objectiveId}`);
        });
    });

    test('should dispatch correct action in case of success response', () => {
      const dispatchSpy = jest.fn();

      return actions.deleteObjective(objectiveId)(dispatchSpy)
        .then(() => {
          const type = dispatchSpy.mock.calls[0][0].type;

          return expect(type).toEqual(EMPLOYEES_LIST.DELETE_OBJECTIVE);
        });
    });

    test('should dispatch correct payload in case of success response', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 200,
      };

      return actions.deleteObjective(objectiveId)(dispatchSpy)
        .then(() => expect(axios.delete()).resolves.toEqual(fakeResponse));
    });

    test('should return rejected promise in case of error in request', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 500,
      };

      axios.delete.mockReturnValue(Promise.reject(fakeResponse));

      return actions.deleteObjective(objectiveId)(dispatchSpy)
        .then(() => expect(axios.delete()).rejects.toEqual(fakeResponse));
    });
  });
});
