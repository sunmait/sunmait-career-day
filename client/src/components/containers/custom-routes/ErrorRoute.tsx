import * as React from 'react';
import { Route } from 'react-router-dom';

const ErrorRoute = (props: any) => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={routeProps => {
        return <Component {...routeProps} />;
      }}
    />
  );
};

export default ErrorRoute;
