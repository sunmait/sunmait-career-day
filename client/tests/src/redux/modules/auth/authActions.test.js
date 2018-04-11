import AUTH_ACTIONS from 'redux/modules/auth/actionConstants';
import axios from 'axios';
import history from 'components/containers/history';
import * as actions from 'redux/modules/auth/actions';

jest.mock('components/containers/history');

const data = {
  status: 200,
  data: {
    AccessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI',
    RefreshToken: '9aece55173374449d113839cd8cdf5c43',
    User: {
      FirstName: "Kirill",
      LastName: "Stasevich",
      PhotoUrl: "https://vk.com/images/camera_200.png",
      Roles: "manager",
      id: 4,
    },
  },
};

describe('auth actions', () => {
  beforeEach(() => {
    axios.post.mockReturnValue(Promise.resolve(data));
    axios.patch.mockReturnValue(Promise.resolve(data));
    history.location.pathname = 'my-url';
    history.push = (url) => history.location.pathname = url;

    localStorage.setItem('AccessToken', data.data.AccessToken);
    localStorage.setItem('RefreshToken', data.data.RefreshToken);
    localStorage.setItem('User', JSON.stringify(data.data.User));

    console.error = jest.fn((error) => {
    });
  });

  describe('method login', () => {
    const userData = {
      Email: 'stasevich@mail.com',
      Password: 'qwerty',
    };

    test('should send POST request to `/api/auth` ', () => {
      const dispatchSpy = jest.fn();

      return actions.login(userData)(dispatchSpy)
        .then(() => {
          const expectedUrl = axios.post.mock.calls[0][0];

          return expect(expectedUrl).toBe('/api/auth');
        });
    });

    test('should dispatch correct action in case of success response ', () => {
      const dispatchSpy = jest.fn();

      return actions.login(userData)(dispatchSpy)
        .then(() => {
          const type = dispatchSpy.mock.calls[0][0].type;

          return expect(type).toEqual(AUTH_ACTIONS.LOGIN);
        });
    });

    test('should dispatch correct payload in case of success response', () => {
      const dispatchSpy = jest.fn();

      return actions.login(userData)(dispatchSpy)
        .then(() => expect(axios.post()).resolves.toEqual(data));
    });

    test('should return rejected promise in case of error in request', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 500,
      };

      axios.post.mockReturnValue(Promise.reject(fakeResponse));

      return actions.login(userData)(dispatchSpy)
        .catch(() => expect(axios.post()).rejects.toEqual(fakeResponse));
    });
  });

  describe('method verifyCredentials', () => {
    test('should dispatch correct action in case of success response ', () => {
      const dispatchSpy = jest.fn();

      actions.verifyCredentials(dispatchSpy);

      const type = dispatchSpy.mock.calls[0][0].type;

      expect(type).toEqual(AUTH_ACTIONS.LOGIN);
    });

    test('should return PATCH request to `/api/auth/verify-credentials`', () => {
      const dispatchSpy = jest.fn();

      actions.verifyCredentials(dispatchSpy);

      const expectedUrl = axios.patch.mock.calls[0][0];

      expect(expectedUrl).toBe('/api/auth/verify-credentials');
    });


    //TODO: maybe remove it
    test('should dispatch correct payload in case of success response', async () => {
      const dispatchSpy = jest.fn();

      await actions.verifyCredentials(dispatchSpy)
        .then(() => {
          expect(axios.patch.mock.calls[0][1].accessToken).toEqual(data.data.AccessToken);
          expect(axios.patch.mock.calls[0][1].refreshToken).toEqual(data.data.RefreshToken);
        });

      expect(dispatchSpy.mock.calls[1][0].type).toEqual(AUTH_ACTIONS.LOGIN);
    });

    test('should return rejected promise in case if error is 401 status in request', async () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        response: {
          status: 401,
        },
      };
      axios.patch.mockReturnValue(Promise.reject(fakeResponse));

      await actions.verifyCredentials(dispatchSpy)
        .then(() => expect(localStorage.length()).toEqual(0));
    });

    test('should return rejected promise in case if error is 500 status in request', async () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        response: {
          status: 500,
        },
      };
      axios.patch.mockReturnValue(Promise.reject(fakeResponse));

      await actions.verifyCredentials(dispatchSpy)
        .catch(() => expect(axios.patch()).rejects.toEqual(fakeResponse));
    });

    test('should logout user if missing one of parameters: accessToken, refreshToken, user', () => {
      localStorage.removeItem('AccessToken');

      return actions.verifyCredentials().then(() => expect(localStorage.length()).toEqual(0));
    });
  });

  describe('method signup', () => {
    const registeredUser = {
      FirstName: 'Kiryl',
      LastName: 'Stasevich',
      Email: 'stasevich@mail.com',
      Password: 'qwerty',
    };

    test('should send POST request to `/api/users` ', () => {
      const dispatchSpy = jest.fn();

      return actions.signUp(registeredUser)(dispatchSpy)
        .then(() => {
          const expectedUrl = axios.post.mock.calls[0][0];

          return expect(expectedUrl).toBe('/api/users');
        });
    });

    test('should dispatch correct payload in case of success response', () => {
      const dispatchSpy = jest.fn();
      const newData = {
        status: 201,
        data: {
          AccessToken: 'dasfsrgb.dfgd',
          RefreshToken: 'dsefregh7rfgjrheg',
          Data: {
            FirstName: "Kirill",
            LastName: "Stasevich",
            PhotoUrl: "https://vk.com/images/camera_200.png",
            Roles: "manager",
            id: 4,
          },
        },
      };

      axios.post.mockReturnValue(Promise.resolve(newData));

      actions.signUp(registeredUser)(dispatchSpy)
        .then(() => expect(history.location.pathname).toEqual('/success'));
    });

    test('should return rejected promise in case of error in request', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        response: {
          status: 500,
          statusText: 'error',
        },
      };

      axios.post.mockReturnValue(Promise.reject(fakeResponse));

      return actions.signUp(registeredUser)(dispatchSpy)
        .catch(() => expect(axios.post()).rejects.toEqual(fakeResponse));
    });
  });

  describe('method logout', () => {
    const refreshToken = 'sefregh7rfgjrheg7thr';

    test('should send DELETE request to `/api/auth/refreshToken ', () => {
      const dispatchSpy = jest.fn();

      return actions.logout(refreshToken)(dispatchSpy)
        .then(() => {
          const expectedUrl = axios.delete.mock.calls[0][0];

          return expect(expectedUrl).toBe(`/api/auth/${refreshToken}`);
        });
    });

    test('should make logout', () => {
      const dispatchSpy = jest.fn();

      return actions.logout(refreshToken)(dispatchSpy)
        .then(() => {
          expect(localStorage.length()).toEqual(0)
        });
    });

    test('should dispatch correct payload in case of success response', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        status: 200,
      };
      return actions.logout(refreshToken)(dispatchSpy)
        .then(() => expect(axios.delete()).resolves.toEqual(fakeResponse));
    });

    test('should return rejected promise in case of error with 500 status in request', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        response: {
          status: 500,
        },
      };

      axios.delete.mockReturnValue(Promise.reject(fakeResponse));

      return actions.logout(refreshToken)(dispatchSpy)
        .then(() => {
          expect(history.location.pathname).toEqual('/error/server-error');
        });
    });

    test('should return rejected promise in case of error with 401 status in request', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        response: {
          status: 401,
        },
      };

      axios.delete.mockReturnValue(Promise.reject(fakeResponse));

      return actions.logout(refreshToken)(dispatchSpy)
        .then(() => {
          expect(localStorage.length()).toEqual(0);
        });
    });

    test('should return rejected promise in case of error with another status status in request', () => {
      const dispatchSpy = jest.fn();
      const fakeResponse = {
        body: {},
        response: {
          status: 404,
        },
      };

      axios.delete.mockReturnValue(Promise.reject(fakeResponse));

      return actions.logout(refreshToken)(dispatchSpy)
        .catch(() => expect(axios.delete()).rejects.toEqual(fakeResponse));
    });
  });
});
