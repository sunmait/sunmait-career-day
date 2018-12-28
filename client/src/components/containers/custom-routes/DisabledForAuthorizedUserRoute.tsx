import * as React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { IUser } from '../../../redux/modules/oidc/reducer';

interface IProps extends RouteProps {
  user?: IUser;
}

const DisabledForAuthorizedUserRoute = (props: IProps) => {
  const { component: Component, user, ...rest } = props;

  return (
    <Route
      {...rest}
      render={routeProps => {
        if (!user && Component) {
          return <Component {...routeProps} />;
        }

        return <Redirect to="/main" />;
      }}
    />
  );
};

export default DisabledForAuthorizedUserRoute;
