import axios from 'axios';
import AUTH_ACTIONS from 'redux/modules/auth/actionConstants';
import sendRequest from 'components/helper/authRequest';
import { logout, refreshTokens } from 'components/helper/authRequest';
import store from 'redux/store';

const storage = {
  AccessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI',
  RefreshToken: '9aece55173374449d113839cd8cdf5c43',
  User: {
    FirstName: "Kirill",
    LastName: "Stasevich",
    PhotoUrl: "https://vk.com/images/camera_200.png",
    Roles: "manager",
    id: 4,
  }
};

describe('sendRequest', () => {
  beforeEach(() => {
    axios.get.mockReturnValue(Promise.resolve({body: {}, status: 200}));
    axios.patch.mockReturnValue(Promise.resolve({body: {}, status: 200}));
    store.dispatch = jest.fn();

    localStorage.setItem('AccessToken', storage.AccessToken);
    localStorage.setItem('RefreshToken', storage.RefreshToken);
    localStorage.setItem('User', JSON.stringify(storage.User));
  });

  console.log('requeeest')

  describe('method sendRequest', () => {
    test('should send GET request to `/my-url`', () => {
      return sendRequest('get', '/my-url')
        .then(() => {
          const expectedUrl = axios.get.mock.calls[0][0];

          //TODO: check headers ?
          return expect(expectedUrl).toBe('/my-url');
        });
    });

    test('should dispatch correct payload in case of success response', () => {
      const fakeResponse = {
        body: {},
        status: 200,
      };

      return sendRequest('get', '/my-url')
        .then(() => {
          expect(axios.get()).resolves.toEqual(fakeResponse);
        });
    });

    // test('should return rejected promise in case of error with status 401 in request', async () => {
    //   const fakeResponse = {
    //     body: {},
    //     response: {
    //       status: 401,
    //       statusText: 'jwt expired',
    //     },
    //   };
    //
    //   axios.get.mockReturnValue(Promise.reject(fakeResponse));
    //
    //   // await axios.patch.mockReturnValue(Promise.reject(fakeResponse));
    //
    //    await sendRequest('get', '/my-url')
    //     .catch( () => {
    //       console.log(axios.get());
    //     });
    // });

    test('should return rejected promise in case of error with status 400 in request', () => {
      const fakeResponse = {
        body: {},
        response: {
          status: 400,
          statusText: 'error message',
        },
      };

      axios.get.mockReturnValue(Promise.reject(fakeResponse));

      return sendRequest('get', '/my-url')
        .catch(() => {
          expect(axios.get()).rejects.toEqual(fakeResponse);
        });
    });

    test('should logout user', () => {
      localStorage.removeItem('AccessToken');

      sendRequest('get', '/my-url');

      return expect(localStorage.length()).toEqual(0);
    });
  });

  describe('method refreshTokens', async () => {
    test('should send PATCH request  to `/api/auth/refresh/refreshToken`', () => {
      const refreshToken = localStorage.getItem('RefreshToken');

      refreshTokens('get', '/my-url').then(() => {
      });

      const expectedUrl = axios.patch.mock.calls[0][0];

      return expect(expectedUrl).toBe(`/api/auth/refresh/${refreshToken}`);
    });
  });

  describe('method logout', () => {
    test('should return empty local storage', () => {
      logout();

      expect(localStorage.length()).toEqual(0);
    });

    test('should dispatch correct action', () => {
      logout();

      const type = store.dispatch.mock.calls[0][0].type;

      expect(type).toEqual(AUTH_ACTIONS.LOGOUT);
    });
  });
});
