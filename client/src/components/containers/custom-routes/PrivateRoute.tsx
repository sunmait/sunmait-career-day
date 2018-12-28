import * as React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { IUser } from '../../../redux/modules/oidc/reducer';
import { ROLES } from '../../../redux/modules/oidc/constants';
import { isUserHasAllowedRole } from '../../helper/userRoleHelper';

interface IProps extends RouteProps {
  user?: IUser;
  allowedRoles?: ROLES[];
}

const PrivateRoute = (props: IProps) => {
  const { component: Component, user, allowedRoles, ...rest } = props;

  return (
    <Route
      {...rest}
      render={routeProps => {
        if (!user || user.expired) {
          return <Redirect to="/login" />;
        }
        if (isUserHasAllowedRole(allowedRoles, user) && Component) {
          return <Component {...routeProps} />;
        }

        return <Redirect to="/main" />;
      }}
    />
  );
};

export default PrivateRoute;
