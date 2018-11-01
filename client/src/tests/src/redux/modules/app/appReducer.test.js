import appReducer from '../../../../../redux/modules/app/reducer';
import APP_ACTIONS from '../../../../../redux/modules/app/actionConstants';

describe('appReducer', () => {
  const notification = {
    status: 500,
    message: 'Ops! Something wrong',
  };

  describe('state with empty parameters', () => {
    test('Should return default state', () => {
      const initAction = { type: '', payload: {} };
      const defaultState = appReducer(undefined, initAction);

      expect(defaultState).toEqual({
        notification: null,
      });
    });
  });

  describe('method handleAddNotification', () => {
    test('Should return new notification', () => {
      const initAction = {
        type: APP_ACTIONS.ADD_NOTIFICATION,
        payload: notification,
      };
      const changedState = appReducer(undefined, initAction);

      expect(changedState).toEqual({ notification });
    });
  });

  describe('method handleDeleteNotification', () => {
    test('Should return empty notification', () => {
      const initAction = { type: APP_ACTIONS.DELETE_NOTIFICATION };
      const initState = {
        notification: { status: 404, message: 'Error message' },
      };
      const changedState = appReducer(initState, initAction);

      expect(changedState).toEqual({ notification: {} });
    });
  });
});
