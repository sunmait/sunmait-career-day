import APP_ACTIONS from './actionConstants';
import { Dispatch } from 'redux/store';
import { INotification } from './reducer';

export type AddNotification = (notification: INotification) => (dispatch: Dispatch) => void;
export const addNotification: AddNotification = (notification: INotification) => (dispatch: Dispatch) => {
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
