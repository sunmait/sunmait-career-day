import 'assets/styles/backgrounds/defaultBackground.less';

import * as React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import * as redux from 'redux';
import { connect } from 'react-redux';
import PrivateRoute from './custom-routes/PrivateRoute';
import DisabledForAuthorizedUserRoute from './custom-routes/DisabledForAuthorizedUserRoute';
import AllowedForUnitManagerRoute from './custom-routes/AllowedForUnitManagerRoute';
import EmployeeHistoryRoute from './custom-routes/EmployeeHistoryRoute';
import ObjectivesOfEmployeesRoute from './custom-routes/ObjectivesOfEmployeesRoute';
import EmployeeProgressPageContainer from 'components/pages/employee-progress-page';
import MainPageContainer from 'components/pages/main-page';
import EmployeeCareerDayPageContainer from 'components/pages/employee-career-day-page';
import EmployeesListPageContainer from 'components/pages/employee-list';
import LoginPageContainer from 'components/pages/login-page';
import SignUpPage from '../pages/signup-page/SignUpPage';
import SuccessPage from '../pages/after-registration-page/SuccessPage';
import App from 'components/common/app';
import { IAuthState } from 'redux/modules/auth/reducer';
import { IStore } from 'redux/rootReducer';
import { Dispatch } from 'redux/store';

interface IProps {
  auth: IAuthState;
}

const AppComponent = (props: IProps) => {
  const {auth} = props;

  return (
    <Router>
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
          <EmployeeHistoryRoute
            exact
            auth={auth}
            path="/employees/:userId"
            component={EmployeeProgressPageContainer}
          />
          <ObjectivesOfEmployeesRoute
            exact
            auth={auth}
            path="/employees/:userId/career-day/:careerDayId"
            component={EmployeeCareerDayPageContainer}
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
