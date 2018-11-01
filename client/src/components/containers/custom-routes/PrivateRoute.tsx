import * as React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { IAuthState } from '../../../redux/modules/auth/reducer';
import { isAuthAsManager } from '../../helper/userRoleHelper';
import { isAuthAsEmployee } from '../../helper/userRoleHelper';

interface IProps extends RouteProps {
  auth: IAuthState;
}

const PrivateRoute = (props: IProps) => {
  const { component: Component, auth, ...rest } = props;

  return (
    <Route
      {...rest}
      render={routeProps => {
        if (auth.user && Component) {
          if (isAuthAsManager(auth.user)) {
            return <Redirect to="/employees" />;
          } else if (isAuthAsEmployee(auth.user)) {
            return <Redirect to="/employee" />;
          }
          return <Component {...routeProps} />;
        }
        return <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
