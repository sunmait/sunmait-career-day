import * as React from 'react';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import { LoginAsEmployee, LoginAsUnitManager } from 'redux/modules/auth/actions';
import Header from 'components/common/header';

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  } as React.CSSProperties,
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 350,
    margin: theme.spacing.unit,
  },
  errorMessage: {
    color: 'red',
  },
  underline: {
    textDecoration: 'none',
  },
});

interface IProps {
  loginAsEmployee: LoginAsEmployee;
  loginAsUnitManager: LoginAsUnitManager;
}

type ComponentClassNames = 'root' | 'button' | 'textField' | 'errorMessage' | 'underline';

interface IState {
  isShowedPassword: boolean;
  password: string;
  login: string;
}

type stateKeys = keyof IState;

class LoginPage extends React.Component<IProps & WithStyles<ComponentClassNames>, IState> {
  constructor(props: IProps & WithStyles<ComponentClassNames>) {
    super(props);
    this.state = {
      isShowedPassword: false,
      password: '',
      login: '',
    };
  }

  private handleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    const propName = e.target.name as stateKeys;
    const newState = { [propName as any]: e.target.value };
    this.setState(newState);
  }

  private handleClickShowPassword() {
    this.setState({ isShowedPassword: !this.state.isShowedPassword });
  }

  private handleMouseDownPassword(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
  }

  private errorMessage() {
    // TODO: must come valid or not valid message from server, if not valid, then:
    return (
      <FormHelperText id="name-error-text" className={this.props.classes.errorMessage}>
        Login or password is not valid
      </FormHelperText>
    );
  }

  public render() {
    const { classes } = this.props;

    return (
      <div>
        <Header title="Login" />

        <Grid container justify="center">
          <form onSubmit={() => this.props.loginAsUnitManager()}>
            <div className={classes.root}>
              <TextField
                label="Login"
                className={classes.textField}
                name="login"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChangeValue(e)}
              />

              <FormControl className={classes.textField}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="adornment-password"
                  name="password"
                  type={this.state.isShowedPassword ? 'text' : 'password'}
                  value={this.state.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChangeValue(e)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => this.handleClickShowPassword()}
                        onMouseDown={(e: React.MouseEvent<HTMLElement>) => this.handleMouseDownPassword(e)}
                      >
                        {this.state.isShowedPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {this.errorMessage()}
              </FormControl>
              <div className={classes.textField}>
                <Link to="/signup" className={classes.underline}>
                  <Typography type="subheading" color="primary">Sign up</Typography>
                </Link>
              </div>
            </div>
            <div className={classes.root}>
              <Button
                raised
                color="primary"
                className={classes.button}
                onClick={() => this.props.loginAsUnitManager()}
              >
                Login
              </Button>
            </div>
          </form>
        </Grid>
      </div>
    );
  }
}

export default withStyles<ComponentClassNames>(styles)(LoginPage);
