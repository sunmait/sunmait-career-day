import './assets/styles/main.scss';
import './assets/images/logo.svg';

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Router from './components/containers/Router';
import store from './redux/store';
import { verifyCredentials } from './redux/modules/auth/actions';

(async () => {
  try {
    await verifyCredentials(store.dispatch);
    render(
      <Provider store={store}>
        <Router />
      </Provider>,
      document.getElementById('main') as HTMLElement,
    );
  } catch (err) {
    console.error(err);
  }
})();
