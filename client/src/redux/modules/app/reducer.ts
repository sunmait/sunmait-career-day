import { ActionType } from 'typesafe-actions';
import APP_ACTIONS from './actionConstants';
import * as actions from './actions';

const defaultState: IAppState = {
  notification: null,
};

export default function(state: IAppState = defaultState, action: ActionType<typeof actions>) {
  switch (action.type) {
    case APP_ACTIONS.ADD_NOTIFICATION:
      return handleAddNotification(state, action.payload);
    case APP_ACTIONS.DELETE_NOTIFICATION:
      return handleDeleteNotification(state);

    default:
      return state;
  }
}

const handleAddNotification = (state: IAppState, notification: INotification) => {
  return {
    ...state,
    notification,
  };
};

const handleDeleteNotification = (state: IAppState) => {
  const { notification } = state;
  if (!notification) {
    return state;
  }
  return { ...state, notification: {} } as IAppState;
};

export interface INotification {
  readonly status: number;
  readonly message: string;
}

export interface IAppState {
  readonly notification: null | INotification;
}
