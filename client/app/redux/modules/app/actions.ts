import APP_ACTIONS from './actionConstants';
import { Dispatch } from 'redux/store';
import { INotification } from './reducer';

export type AddNotification = (notification: INotification) => (dispatch: Dispatch) => void;
export const addNotification: AddNotification = (notification: INotification) => (dispatch: Dispatch) => {
  if (notification.status === 403) {
    notification.message = 'You don\'t have access to this action';
  } else if (notification.status === 404) {
    notification.message = 'This item is not found';
  } else if (notification.status === 401) {
    notification.message = 'You should be authorized for this action';
  }
  dispatch({
    type: APP_ACTIONS.ADD_NOTIFICATION,
    payload: notification,
  });
};

export type DeleteNotification = () => (dispatch: Dispatch) => void;
export const deleteNotification: DeleteNotification = () => (dispatch: Dispatch) => {
  dispatch({
    type: APP_ACTIONS.DELETE_NOTIFICATION,
  });
};
