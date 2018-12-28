import { reducer as oidcReducer, UserState as OidcUserState } from 'redux-oidc';
import { User as OidcUser } from 'oidc-client';
import { ROLES } from './constants';

export interface IUserProfile {
  id: string;
  role: ROLES;
  given_name: string;
  family_name: string;
  PhotoUrl?: string;
}

export interface IUser extends OidcUser {
  profile: IUserProfile;
}

export interface IOidcState extends OidcUserState {
  user?: IUser;
}

export default oidcReducer;
