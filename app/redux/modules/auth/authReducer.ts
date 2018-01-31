interface IUser {
  role: string;
  fullName: string;
}

export interface IAuthState {
  user: null | IUser;
}

const defaultState: IAuthState = {
  user: null
};

export default function (state = defaultState, { type, payload }: {type: string, payload: any}) {
  switch (type) {
    default:
      return state;
  }
}
