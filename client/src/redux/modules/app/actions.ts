import APP_ACTIONS from './actionConstants';
import { INotification } from './reducer';
import { action } from 'typesafe-actions';

export const addNotification = (payload: INotification) => action(APP_ACTIONS.ADD_NOTIFICATION, payload);

export const deleteNotification = () => action(APP_ACTIONS.DELETE_NOTIFICATION);
