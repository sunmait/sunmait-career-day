import * as React from 'react';
import {BrowserRouter as Router, Route, RouteProps, Switch, Redirect} from 'react-router-dom';
import * as redux from 'redux';
import {connect} from 'react-redux';
import MainPageContainer from 'components/pages/MainPage/MainPageContainer';
import LoginPageContainer from 'components/pages/login-page/LoginPageContainer';
import {IAuthState} from 'redux/modules/auth/authReducer';
import {IRootState} from 'redux/rootReducer';
import {Dispatch} from 'redux/store';

interface IPrivateRouteProps extends RouteProps {
  auth: IAuthState;
}

const PrivateRoute = (props: IPrivateRouteProps) => {
  const {component: Component, auth, ...rest} = props;

  return (
    <Route
      {...rest}
      render={props => {
        if (auth.user) {
          return <Component {...props} />;
        }

        return <Redirect to="/login" />;
      }}
    />
  );
};

interface IAppProps {
  auth: IAuthState;
};

const AppComponent = (props: IAppProps) => {
  const {auth} = props;

  return (
    <Router>
      <Switch>
        <PrivateRoute exact auth={auth} path="/main" component={MainPageContainer} />
        <Route exact path="/login" component={LoginPageContainer} />

        <Redirect from="/" exact to="/main" />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state: IRootState) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch: Dispatch) => redux.bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
