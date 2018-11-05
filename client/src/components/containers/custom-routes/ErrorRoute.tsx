import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';

interface IProps extends RouteProps {}

const ErrorRoute = (props: IProps) => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={routeProps => {
        return Component && <Component {...routeProps} />;
      }}
    />
  );
};

export default ErrorRoute;
