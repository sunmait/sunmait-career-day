import APP_ACTIONS from './actionConstants';

const defaultState: IAppState = {
  notification: null,
};

export default function(
  state: IAppState = defaultState,
  { type, payload }: IAppAction,
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

const handleAddNotification = (
  state: IAppState,
  notification: INotification,
) => {
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
  status: number;
  message: string;
}

export interface IAppState {
  notification: null | INotification;
}

export interface IAppAction {
  type: APP_ACTIONS;
  payload?: any;
}
