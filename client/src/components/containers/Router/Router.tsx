import '../../../assets/styles/backgrounds/defaultBackground.scss';

import * as React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from '../history';
import { ConnectProps } from './ConnectContainer';
import LoginSilentRenewPage from '../../pages/login-silent-renew-page';
import AppRoutes from './AppRoutes';

interface IProps extends ConnectProps {}

const RouterComponent = (props: IProps) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/silent-renew" component={LoginSilentRenewPage} />
        <Route path="*" render={() => <AppRoutes {...props} />} />
      </Switch>
    </Router>
  );
};

export default RouterComponent;
