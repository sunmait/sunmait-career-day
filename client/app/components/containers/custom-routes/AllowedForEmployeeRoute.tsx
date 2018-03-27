import * as React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { IAuthState } from 'redux/modules/auth/reducer';
import { isAuthAsEmployee } from 'components/helper/userRoleHelper';

interface IProps extends RouteProps {
  auth: IAuthState;
}

const AllowedForEmployeeRoute = (props: IProps) => {
  const { component: Component, auth, ...rest } = props;

  return (
    <Route
      {...rest}
      render={routeProps => {
        if (auth.user) {
          if (isAuthAsEmployee(auth.user)) {
            return <Component {...routeProps} />;
          }
        }
        return <Redirect to="/main" />;
      }}
    />
  );
};

export default AllowedForEmployeeRoute;
