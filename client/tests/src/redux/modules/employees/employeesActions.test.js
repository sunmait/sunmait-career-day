import EMPLOYEES_LIST from 'redux/modules/employees/employeesActionConstants';
import * as actions from 'redux/modules/employees/employeesAction';
import axios from 'axios';

describe('employees action', () => {
  beforeEach(() => {
    axios.get.mockReturnValue(Promise.resolve({status: 200, body: {}}));
  });

  describe('method getEmployeesList', () => {
    test('should send GET request to `/api/employee`', () => {
      const dispatchSpy = jest.fn();

      return actions.getEmployeesList()(dispatchSpy)
        .then(() => {
          const urlArg = axios.get.mock.calls[0][0];

          return expect(urlArg).toBe('/api/employee');
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

      axios.get.mockReturnValue(Promise.resolve(fakeResponse));

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
    test('should sent GET request to `/api/careerDays`', () => {
      const dispatchSpy = jest.fn();

      return actions.getCareerDayOfEmployee()(dispatchSpy)
        .then(() => {
          const urlArg = axios.get.mock.calls[0][0];

          return expect(urlArg).toBe('/api/careerDays/');
        });
    });

    test('should dispatch correct action in case of success response', () => {
      const dispatchSpy = jest.fn();

      return actions.getCareerDayOfEmployee()(dispatchSpy)
        .then(() => {
          const type = dispatchSpy.mock.calls[0][0].type;

          return expect(type).toEqual(EMPLOYEES_LIST.GET_CAREER_DAYS);
        });
    });

    test('should dispatch correct payload in case of success response', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 200,
      };
      axios.get.mockReturnValue(Promise.resolve(fakeResponse));

      return actions.getCareerDayOfEmployee()(dispatchSpy)
        .then(() => expect(axios.get()).resolves.toEqual(fakeResponse));
    });

    test('should return rejected promise in case of error in request', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 500,
      };
      axios.get.mockReturnValue(Promise.reject(fakeResponse));

      return actions.getCareerDayOfEmployee()(dispatchSpy)
        .then(() => expect(axios.get()).rejects.toEqual(fakeResponse));
    });
  });

  describe('method getObjectives', () => {
    test('should sent GET request to `/api/objectives`', () => {
      const dispatchSpy = jest.fn();

      return actions.getObjectives()(dispatchSpy)
        .then(() => {
          const urlArg = axios.get.mock.calls[0][0];

          return expect(urlArg).toBe('/api/objectives/');
        });
    });

    test('should dispatch correct action in case of success response', () => {
      const dispatchSpy = jest.fn();

      return actions.getObjectives()(dispatchSpy)
        .then(() => {
          const type = dispatchSpy.mock.calls[0][0].type;

          return expect(type).toEqual(EMPLOYEES_LIST.GET_OBJECTIVES);
        });
    });

    test('should dispatch correct payload in case of success response', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 200,
      };
      axios.get.mockReturnValue(Promise.resolve(fakeResponse));

      return actions.getObjectives()(dispatchSpy)
        .then(() => expect(axios.get()).resolves.toEqual(fakeResponse));
    });

    test('should return rejected promise in case of error in request', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 500,
      };
      axios.get.mockReturnValue(Promise.reject(fakeResponse));

      return actions.getObjectives()(dispatchSpy)
        .then(() => expect(axios.get()).rejects.toEqual(fakeResponse));
    });
  });
});
