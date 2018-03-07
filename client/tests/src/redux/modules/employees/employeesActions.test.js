import EMPLOYEES_LIST from 'redux/modules/employees/actionConstants';
import * as actions from 'redux/modules/employees/actions';
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
    const employee = {
      id: 1,
      Roles: '1',
      LastName: 'Tsvirko',
      FirstName: 'Alex',
      PhotoUrl: 'my-avatar',
      AccessToken: 'token',
    };
    const fakeResponse = {
      body: {},
      status: 500,
    };
    test('should sent GET request to `/api/career-days/1`', () => {
      const dispatchSpy = jest.fn();
      return actions.getCareerDayOfEmployee(employee)(dispatchSpy)
        .then(() => {
          const expectedUrl = axios.get.mock.calls[0][0];

          return expect(expectedUrl).toBe('/api/career-days/1');
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
      const dispatchSpy = jest.fn();

      axios.get.mockReturnValue(Promise.resolve(fakeResponse));

      return actions.getCareerDayOfEmployee(employee)(dispatchSpy)
        .then(() => expect(axios.get()).resolves.toEqual(fakeResponse));
    });

    test('should return rejected promise in case of error in request', () => {
      const dispatchSpy = jest.fn();

      axios.get.mockReturnValue(Promise.reject(fakeResponse));

      return actions.getCareerDayOfEmployee(employee)(dispatchSpy)
        .then(() => expect(axios.get()).rejects.toEqual(fakeResponse));
    });
  });

  describe('method getSelectedCareerDay',() => {
    const fakeResponse = {
      body: {},
      status: 500,
    };
    test('should sent GET request to `/api/objectives/1`',() => {
      const dispatchSpy = jest.fn();
      const numberOfEmployee = 1;

      return actions.getSelectedCareerDay(numberOfEmployee)(dispatchSpy)
        .then(() => {
          const expectedUrl = axios.get.mock.calls[0][0];

          return expect(expectedUrl).toBe('/api/objectives/1');
        });
    });

    test('should dispatch correct action in case of success response',() => {
      const dispatchSpy = jest.fn();

      return actions.getSelectedCareerDay()(dispatchSpy)
        .then(() => {
          const type = dispatchSpy.mock.calls[0][0].type;

          return expect(type).toEqual(EMPLOYEES_LIST.GET_SELECTED_CAREER_DAY)
        });
    });

    test('should dispatch correct payload in case of success response', () => {
      const dispatchSpy = jest.fn();

      axios.get.mockReturnValue(Promise.resolve(fakeResponse));

      return actions.getSelectedCareerDay()(dispatchSpy)
        .then(() => expect(axios.get()).resolves.toEqual(fakeResponse));
    });

    test('should return rejected promise in case of error in request', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 500,
      };
    
      axios.get.mockReturnValue(Promise.reject(fakeResponse));

      return actions.getSelectedCareerDay()(dispatchSpy)
        .then(() => expect(axios.get()).rejects.toEqual(fakeResponse));
    });
  });

  describe('method getSelectedEmployee',() => {
    const employee = {
      id: 1,
      Roles: '1',
      LastName: 'Tsvirko',
      FirstName: 'Alex',
      PhotoUrl: 'my-avatar',
      AccessToken: 'token',
    };
    
    test('should dispatch correct action',() => {
      const dispatchSpy = jest.fn();

      actions.getSelectedEmployee()(dispatchSpy);
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

  describe('method addCareerDay',() => {
    const fakeResponse = {
      body: {},
      status: 200,
    };
    
    test('should sent POST request to `/api/career-days`',() => {
      const dispatchSpy = jest.fn();
      
      return actions.addCareerDay()(dispatchSpy)
        .then(() => {
          const expectedUrl = axios.post.mock.calls[0][0];

          return expect(expectedUrl).toBe('/api/career-days');
        });
    });

    test('should dispatch correct action in case of success response',() => {
      const dispatchSpy = jest.fn();

      return actions.addCareerDay()(dispatchSpy)
        .then(() => {
          const type = dispatchSpy.mock.calls[0][0].type;

          return expect(type).toEqual(EMPLOYEES_LIST.ADD_CAREER_DAY);
        });
    });

    test('should dispatch correct payload in case of success response', () => {
      const dispatchSpy = jest.fn();
      
      return actions.addCareerDay()(dispatchSpy)
        .then(() => expect(axios.post()).resolves.toEqual(fakeResponse));
    });

    test('should return rejected promise in case of error in request', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 500,
      };

      axios.post.mockReturnValue(Promise.reject(fakeResponse));

      return actions.addCareerDay()(dispatchSpy)
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
      
      axios.post.mockReturnValue(Promise.resolve({status: 200, body: {}}));

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

      axios.post.mockReturnValue(Promise.resolve(fakeResponse));

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
});
