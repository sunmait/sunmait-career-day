import * as React from 'react';
import {render} from 'react-dom';
import Router from 'components/containers/Router.jsx';

import 'assets/styles/main.less';

render(
  <Router />,
  document.getElementById('main') as HTMLElement
);
