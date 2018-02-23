import * as React from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import * as authActions from 'redux/modules/auth/actions';
import Header from 'components/common/header';

interface IProps {
  loginAsEmployee: authActions.LoginAsEmployee;
  loginAsUnitManager: authActions.LoginAsUnitManager;
}

interface IState {}

export default class LoginPage extends React.Component<IProps, IState> {
  public render() {
    return (
      <div>
        <Grid item md={12}>
          <Header title="Login" />
        </Grid>

        <Grid container justify="center" alignItems="center" spacing={8}>
          <Grid item>
            <Button
              id="login-as-employee-btn"
              raised
              onClick={() => this.props.loginAsEmployee()}
            >
              Login as employee
            </Button>
          </Grid>

          <Grid item>
            <Button
              id="login-as-unit-manager-btn"
              raised
              onClick={() => this.props.loginAsUnitManager()}
            >
              Login as unit manager
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
