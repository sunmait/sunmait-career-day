import * as React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { IAuthState } from '../../../redux/modules/auth/reducer';

interface IProps extends RouteProps {
  auth: IAuthState;
}

const ObjectivesOfEmployeesRouter = (props: IProps) => {
  const { component: Component, auth, ...rest } = props;

  return (
    <Route
      {...rest}
      render={routeProps => {
        if (auth.user && Component) {
          return <Component {...routeProps} />;
        }
        return <Redirect to="/login" />;
      }}
    />
  );
};

export default ObjectivesOfEmployeesRouter;
