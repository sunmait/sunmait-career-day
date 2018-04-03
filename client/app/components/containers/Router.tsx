import 'assets/styles/backgrounds/defaultBackground.less';

import * as React from 'react';
import { Router, Switch, Redirect } from 'react-router-dom';
import history from './history';
import * as redux from 'redux';
import { connect } from 'react-redux';
import PrivateRoute from './custom-routes/PrivateRoute';
import DisabledForAuthorizedUserRoute from './custom-routes/DisabledForAuthorizedUserRoute';
import AllowedForUnitManagerRoute from './custom-routes/AllowedForUnitManagerRoute';
import ObjectivesOfEmployeesRoute from './custom-routes/ObjectivesOfEmployeesRoute';
import AllowedForEmployeeRoute from './custom-routes/AllowedForEmployeeRoute';
import ErrorRoute from './custom-routes/ErrorRoute';
import EmailVerificationRoute from './custom-routes/EmailVerificationRoute';
import EmployeeProgressPageContainer from 'components/pages/employee-progress-page';
import MainPageContainer from 'components/pages/main-page';
import CareerDayPageContainer from 'components/pages/employee-career-day-page';
import EmployeesListPageContainer from 'components/pages/employee-list';
import LoginPageContainer from 'components/pages/login-page';
import SignUpPage from '../pages/signup-page';
import SuccessPage from '../pages/after-registration-page/SuccessPage';
import NotFoundPage from '../common/error-pages/NotFoundPage';
import InternalServerErrorPage from '../common/error-pages/InternalServerErrorPage';
import EmailVerificationPage from '../common/email-verification-page';
import App from 'components/common/app';
import { IAuthState } from 'redux/modules/auth/reducer';
import { IStore } from 'redux/rootReducer';
import { Dispatch } from 'redux/store';

interface IProps {
  auth: IAuthState;
}

const AppComponent = (props: IProps) => {
  const { auth } = props;

  return (
    <Router history={history}>
      <App>
        <Switch>
          <PrivateRoute
            exact
            auth={auth}
            path="/main"
            component={MainPageContainer}
          />
          <DisabledForAuthorizedUserRoute
            exact
            auth={auth}
            path="/login"
            component={LoginPageContainer}
          />
          <DisabledForAuthorizedUserRoute
            exact
            auth={auth}
            path="/signup"
            component={SignUpPage}
          />
          <DisabledForAuthorizedUserRoute
            exact
            auth={auth}
            path="/success"
            component={SuccessPage}
          />
          <AllowedForUnitManagerRoute
            exact
            auth={auth}
            path="/employees"
            component={EmployeesListPageContainer}
          />
          <AllowedForEmployeeRoute
            exact
            auth={auth}
            path="/employee"
            component={CareerDayPageContainer}
          />
          <AllowedForUnitManagerRoute
            exact
            auth={auth}
            path="/employees/:userId"
            component={EmployeeProgressPageContainer}
          />
          <ObjectivesOfEmployeesRoute
            exact
            auth={auth}
            path="/employees/:userId/career-day/:careerDayId"
            component={CareerDayPageContainer}
          />
          <ErrorRoute
            exact
            path="/error/not-found"
            component={NotFoundPage}
          />
          <ErrorRoute
            exact
            path="/error/server-error"
            component={InternalServerErrorPage}
          />
          <EmailVerificationRoute
            exact
            path="/verify-email"
            component={EmailVerificationPage}
          />

          <Redirect from="/" exact to="/main" />
        </Switch>
      </App>
    </Router>
  );
};

const mapStateToProps = (state: IStore) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  redux.bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
