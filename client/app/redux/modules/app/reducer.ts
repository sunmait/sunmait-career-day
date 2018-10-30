import APP_ACTIONS from './actionConstants';

const defaultState: IAppState = {
  notification: null,
};

export default function(
  state: IAppState = defaultState,
  { type, payload }: { type: APP_ACTIONS; payload: any },
) {
  switch (type) {
    case APP_ACTIONS.ADD_NOTIFICATION:
      return handleAddNotification(state, payload);
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
  const newState = Object.assign({}, state);
  delete newState.notification.status;
  delete newState.notification.message;

  return newState;
  // return { ...state, notification: {} };
};

export interface INotification {
  status: number;
  message: string;
}

export interface IAppState {
  notification: null | INotification;
}
