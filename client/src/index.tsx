import './assets/styles/main.scss';
import './assets/images/logo.svg';

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { OidcProvider } from 'redux-oidc';
import Router from './components/containers/Router';
import store from './redux/store';
import userManager from './utils/oidcUserManager';

(async () => {
  try {
    render(
      <Provider store={store}>
        <OidcProvider store={store} userManager={userManager}>
          <Router />
        </OidcProvider>
      </Provider>,
      document.getElementById('main') as HTMLElement,
    );
  } catch (err) {
    console.error(err);
  }
})();
