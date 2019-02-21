import { createUserManager } from 'redux-oidc';

const HOST_URL = `${window.location.protocol}//${window.location.hostname}${
  window.location.port ? `:${window.location.port}` : ''
}`;

const userManagerConfig = {
  client_id: process.env.REACT_APP_CLIENT_ID,
  response_type: 'token id_token',
  scope: process.env.REACT_APP_SCOPE,
  authority: process.env.REACT_APP_AUTHORITY_URL,
  silent_redirect_uri: `${HOST_URL}/silent-renew`,
  redirect_uri: `${HOST_URL}/callback`,
  post_logout_redirect_uri: `${HOST_URL}`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  monitorSession: true,
};

const userManager = createUserManager(userManagerConfig);

userManager.events.addUserSignedOut(() => {
  userManager.signinRedirect({ data: { redirectUrl: '/' } });
});

export default userManager;
