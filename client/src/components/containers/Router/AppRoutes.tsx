import * as React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../custom-routes/PrivateRoute';
import DisabledForAuthorizedUserRoute from '../custom-routes/DisabledForAuthorizedUserRoute';
import ErrorRoute from '../custom-routes/ErrorRoute';
import EmployeeProgressPageContainer from '../../pages/employee-progress-page';
import MainPageContainer from '../../pages/main-page';
import CareerDayPageContainer from '../../pages/employee-career-day-page';
import NearestCareerDayListPageContainer from '../../pages/nearest-career-day-list';
import EmployeesListPageContainer from '../../pages/employee-list';
import NotFoundPage from '../../common/error-pages/NotFoundPage';
import InternalServerErrorPage from '../../common/error-pages/InternalServerErrorPage';
import App from '../../common/app';
import { ConnectProps } from './ConnectContainer';
import LoginPage from '../../pages/login-page';
import LoginCallbackPage from '../../pages/login-callback-page';
import { ROLES } from '../../../redux/modules/oidc/constants';

interface IProps extends ConnectProps {}

const AppRoutes = (props: IProps) => {
  const { user } = props;

  return (
    <App>
      <Switch>
        <PrivateRoute
          exact
          user={user}
          path="/main"
          component={MainPageContainer}
        />
        <DisabledForAuthorizedUserRoute
          exact
          user={user}
          path="/login"
          component={LoginPage}
        />
        <DisabledForAuthorizedUserRoute
          exact
          user={user}
          path="/callback"
          component={LoginCallbackPage}
        />
        <PrivateRoute
          exact
          user={user}
          allowedRoles={[ROLES.UNIT_MANAGER]}
          path="/nearest-career-day"
          component={NearestCareerDayListPageContainer}
        />
        <PrivateRoute
          exact
          user={user}
          allowedRoles={[ROLES.UNIT_MANAGER]}
          path="/employees"
          component={EmployeesListPageContainer}
        />
        <PrivateRoute
          exact
          user={user}
          allowedRoles={[ROLES.EMPLOYEE]}
          path="/employee"
          component={CareerDayPageContainer}
        />
        <PrivateRoute
          exact
          user={user}
          allowedRoles={[ROLES.UNIT_MANAGER]}
          path="/employees/:userId"
          component={EmployeeProgressPageContainer}
        />
        <PrivateRoute
          exact
          user={user}
          allowedRoles={[ROLES.UNIT_MANAGER, ROLES.EMPLOYEE]}
          path="/employees/:userId/career-day/:careerDayId"
          component={CareerDayPageContainer}
        />
        <ErrorRoute exact path="/error/not-found" component={NotFoundPage} />
        <ErrorRoute
          exact
          path="/error/server-error"
          component={InternalServerErrorPage}
        />

        <Redirect from="/" exact to="/main" />
        <Redirect from="*" exact to="/error/not-found" />
      </Switch>
    </App>
  );
};

export default AppRoutes;
