import APP_ACTIONS from 'redux/modules/app/actionConstants';
import * as actions from 'redux/modules/app/actions';

describe('appActions', () => {
  describe('method addNotification', () => {
    test('Should add notification with status 500', () => {
      const dispatchSpy = jest.fn();
      const notification = {
        status: 500,
        message: 'Ops! Something wrong',
      };

      actions.addNotification(notification)(dispatchSpy);

      expect(dispatchSpy.mock.calls[0][0].type).toEqual(APP_ACTIONS.ADD_NOTIFICATION);
    });

    test('Should add notification with status 404', () => {
      const dispatchSpy = jest.fn();
      const notification = {
        status: 404,
        message: 'Ops! Something wrong',
      };

      actions.addNotification(notification)(dispatchSpy);

      expect(dispatchSpy.mock.calls[0][0].type).toEqual(APP_ACTIONS.ADD_NOTIFICATION);
    });

    test('Should add notification with status 403', () => {
      const dispatchSpy = jest.fn();
      const notification = {
        status: 403,
        message: 'Ops! Something wrong',
      };

      actions.addNotification(notification)(dispatchSpy);

      expect(dispatchSpy.mock.calls[0][0].type).toEqual(APP_ACTIONS.ADD_NOTIFICATION);
    });

    test('Should add notification with status 401', () => {
      const dispatchSpy = jest.fn();
      const notification = {
        status: 401,
        message: 'Ops! Something wrong',
      };

      actions.addNotification(notification)(dispatchSpy);

      expect(dispatchSpy.mock.calls[0][0].type).toEqual(APP_ACTIONS.ADD_NOTIFICATION);
    });

    test('Should add notification with status 400', () => {
      const dispatchSpy = jest.fn();
      const notification = {
        status: 400,
        message: 'Ops! Something wrong',
      };

      actions.addNotification(notification)(dispatchSpy);

      expect(dispatchSpy.mock.calls[0][0].type).toEqual(APP_ACTIONS.ADD_NOTIFICATION);
    });
  });

  describe('method deleteNotification', () => {
    test('Should delete notification', () => {
      const dispatchSpy = jest.fn();

      actions.deleteNotification()(dispatchSpy);

      expect(dispatchSpy.mock.calls[0][0].type).toEqual(APP_ACTIONS.DELETE_NOTIFICATION);
    });
  });
});
