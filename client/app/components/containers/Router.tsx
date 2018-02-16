import 'assets/styles/backgrounds/defaultBackground.less';

import * as React from 'react';
import {BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import * as redux from 'redux';
import {connect} from 'react-redux';
import PrivateRoute from './custom-routes/PrivateRoute';
import DisabledForAuthorizedUserRoute from './custom-routes/DisabledForAuthorizedUserRoute';
import AllowedForUnitManagerRoute from './custom-routes/AllowedForUnitManagerRoute';
import EmployeeHistoryRoute from './custom-routes/EmployeeHistoryRoute';
import ObjectivesOfEmployeesRoute from './custom-routes/ObjectivesOfEmployeesRoute';
import EmployeeProgressPageContainer from 'components/pages/employee-progress-page/EmployeeProgressPageContainer';
import MainPageContainer from 'components/pages/main-page/MainPageContainer';
import EmployeeCareerDayPageContainer from 'components/pages/employee-career-day-page/EmployeeCareerDayPageContainer';
import EmployeesListPageContainer from 'components/pages/employee-list/EmployeeListContainer';
import LoginPageContainer from 'components/pages/login-page/LoginPageContainer';
import {IAuthState} from 'redux/modules/auth/authReducer';
import {IRootState} from 'redux/rootReducer';
import {Dispatch} from 'redux/store';

interface IAppProps {
  auth: IAuthState;
}

const AppComponent = (props: IAppProps) => {
  const {auth} = props;

  return (
    <Router>
      <Switch>
        <PrivateRoute exact auth={auth} path="/main" component={MainPageContainer} />
        <DisabledForAuthorizedUserRoute exact auth={auth} path="/login" component={LoginPageContainer} />
        <AllowedForUnitManagerRoute exact auth={auth} path="/employees" component={EmployeesListPageContainer} />
        <EmployeeHistoryRoute
          exact
          auth={auth}
          path="/employees/:userId"
          component={EmployeeProgressPageContainer}
        />
        <ObjectivesOfEmployeesRoute
          exact
          auth={auth}
          path="/employees/:userId/career-day/:careerId"
          component={EmployeeCareerDayPageContainer}
        />

        <Redirect from="/" exact to="/main" />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state: IRootState) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch: Dispatch) => redux.bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
