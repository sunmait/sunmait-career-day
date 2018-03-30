import AUTH_ACTIONS from './actionConstants';

const defaultState: IAuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

export default function(state: IAuthState = defaultState, { type, payload }: { type: string; payload: any }) {
  switch (type) {
    case AUTH_ACTIONS.LOGIN:
      return handleLogin(state, payload);

    case AUTH_ACTIONS.VERIFY_CREDENTIALS:
      return handleVerifyCredentials(state, payload);

    case AUTH_ACTIONS.ACCESS_TOKEN_EXPIRED:
      return handleAccessTokenExpired(state, payload);

    case AUTH_ACTIONS.REFRESH_TOKEN_EXPIRED:
      return handleLogin(state, payload);

    default:
      return state;
  }
}

function handleLogin(state: IAuthState, loginData: ILogin) {
  return { ...state, user: loginData.Data, accessToken: loginData.AccessToken, refreshToken: loginData.RefreshToken };
}

function handleVerifyCredentials(state: IAuthState, user: IUser) {
  return { ...state, user };
}

function handleAccessTokenExpired(state: IAuthState, tokens: ITokens) {
  return { ...state, accessToken: tokens.AccessToken, refreshToken: tokens.RefreshToken };
}

export interface IUser {
  id: number;
  Roles: string;
  FirstName: string;
  LastName: string;
  PhotoUrl: string;
}

export interface IAuthState {
  user: null | IUser;
  accessToken: null | string;
  refreshToken: null | string;
}

export interface ILogin {
  AccessToken: string;
  RefreshToken: string;
  Data: IUser;
}

export interface ITokens {
  AccessToken: string;
  RefreshToken: string;
}
