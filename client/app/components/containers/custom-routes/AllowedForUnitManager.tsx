import * as React from 'react';
import {Route, RouteProps, Redirect} from 'react-router-dom';
import {IAuthState} from 'redux/modules/auth/authReducer';
import isAuthAsManager from 'components/helper/userRoleHelper';

interface IDisabledForAuthorizedUserRouteProps extends RouteProps {
  auth: IAuthState;
}

const AllowedForUnitManager = (props: IDisabledForAuthorizedUserRouteProps) => {
  const {component: Component, auth, ...rest} = props;

  return (
    <Route
      {...rest}
      render={routeProps => {
        if (isAuthAsManager(auth.user)) {
          return <Component {...routeProps} />;
        }

        return <Redirect to="/main" />;
      }}
    />
  );
};

export default AllowedForUnitManager;
