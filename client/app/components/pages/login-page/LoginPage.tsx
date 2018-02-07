import * as React from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import * as authActions from 'redux/modules/auth/authActions';
import Header from 'components/common/Header';

interface ILoginPageProps {
  loginAsEmployee: authActions.LoginAsEmployee;
  loginAsUnitManager: authActions.LoginAsUnitManager;
}

interface ILoginPageState {
}

export default class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {
  public render() {
    return (
      <div>
        <Grid item md={12}>
          {Header('login')}
        </Grid>

        <Grid container justify="center" alignItems="center" spacing={8}>
          <Grid item>
            <Button raised onClick={() => this.props.loginAsEmployee()}>Login as employee</Button>
          </Grid>

          <Grid item>
            <Button raised onClick={() => this.props.loginAsUnitManager()}>Login as unit manager</Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
