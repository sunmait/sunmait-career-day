import APP_ACTIONS from 'redux/modules/app/actionConstants';
import * as actions from 'redux/modules/app/actions';

describe('appActions', () => {
  test('Should add notification', () => {
    const dispatchSpy = jest.fn();
    const notification = {
      status: 500,
      message: 'Ops! Something wrong',
    };

    actions.addNotification(notification)(dispatchSpy);

    expect(dispatchSpy.mock.calls[0][0].type).toEqual(APP_ACTIONS.ADD_NOTIFICATION);
  });

  test('Should delete notification', () => {
    const dispatchSpy = jest.fn();

    actions.deleteNotification()(dispatchSpy);

    expect(dispatchSpy.mock.calls[0][0].type).toEqual(APP_ACTIONS.DELETE_NOTIFICATION);
  });
});
