import * as React from 'react';
import {BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import * as redux from 'redux';
import {connect} from 'react-redux';
import PrivateRoute from './custom-routes/PrivateRoute';
import DisabledForAuthorizedUserRoute from './custom-routes/DisabledForAuthorizedUserRoute';
import AllowedForUnitManager from './custom-routes/AllowedForUnitManager';
import MainPageContainer from 'components/pages/main-page/MainPageContainer';
import EmployeeListContainer from 'components/pages/employee-list/EmployeeListContainer';
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
        <AllowedForUnitManager auth={auth} path="/employees" component={EmployeeListContainer} />

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
