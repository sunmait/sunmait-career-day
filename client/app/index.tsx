import 'assets/styles/main.less';
import 'assets/images/logo.svg';

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Router from 'components/containers/Router';
import store from 'redux/store';

render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('main') as HTMLElement,
);
