import * as React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { IAuthState } from '../../../redux/modules/auth/reducer';
import { isAuthAsManager } from '../../helper/userRoleHelper';

interface IProps extends RouteProps {
  auth: IAuthState;
}

const AllowedForUnitManagerRoute = (props: IProps) => {
  const { component: Component, auth, ...rest } = props;

  return (
    <Route
      {...rest}
      render={routeProps => {
        if (auth.user && Component) {
          if (isAuthAsManager(auth.user)) {
            return <Component {...routeProps} />;
          }
        }
        return <Redirect to="/main" />;
      }}
    />
  );
};

export default AllowedForUnitManagerRoute;
