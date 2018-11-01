import * as React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Header from '../../common/header';
import backgroundColorHelper from '../../helper/backgroundColorHelper';
import Paper from '@material-ui/core/Paper';
import { ConnectProps } from './ConnectContainer';
import { StylesProps } from './StylesContainer';

interface IProps extends ConnectProps, StylesProps {
}

interface IState {
  isShowedPassword: boolean;
  password: string;
  email: string;
  isValidUserData: boolean;
}

type stateKeys = keyof IState;

class LoginPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isShowedPassword: false,
      password: '',
      email: '',
      isValidUserData: false,
    };
  }

  public componentDidMount() {
    this.setState({ isValidUserData: true });
  }

  private handleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    const propName = e.target.name as stateKeys;
    const newState = { [propName as any]: e.target.value } as Pick<
      IState,
      stateKeys
    >;
    this.setState(newState);
  }

  private handleClickShowPassword() {
    this.setState({ isShowedPassword: !this.state.isShowedPassword });
  }

  private static handleMouseDownPassword(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
  }

  private errorMessage() {
    if (!this.state.isValidUserData) {
      return (
        <FormHelperText
          id="name-error-text"
          className={this.props.classes.errorMessage}
        >
          Login or password is not valid
        </FormHelperText>
      );
    }
  }

  private async verifyUserData() {
    try {
      if (
        this.state.email.length !== 0 &&
        (this.state.password.length >= 6 && this.state.password.length <= 18)
      ) {
        await this.props.login(this.state.email, this.state.password);
      }
    } catch (err) {
      this.setState({ isValidUserData: false });
    }
  }

  public render() {
    const { classes } = this.props;

    backgroundColorHelper();
    return (
      <div>
        <Grid container justify="center">
          <Header title="Login" />
          <form
            onSubmit={() =>
              this.props.login(this.state.email, this.state.password)
            }
          >
            <Paper>
              <div className={classes.root}>
                <TextField
                  label="Login"
                  className={classes.textField}
                  name="email"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    this.handleChangeValue(e)
                  }
                />

                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="adornment-password"
                    name="password"
                    type={this.state.isShowedPassword ? 'text' : 'password'}
                    value={this.state.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      this.handleChangeValue(e)
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => this.handleClickShowPassword()}
                          onMouseDown={(e: React.MouseEvent<HTMLElement>) =>
                            LoginPage.handleMouseDownPassword(e)
                          }
                        >
                          {this.state.isShowedPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {this.errorMessage()}
                </FormControl>
              </div>
              <div className={classes.root}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => this.verifyUserData()}
                >
                  Login
                </Button>
              </div>
              <div className={classes.root}>
                <Link to="/signup" className={classes.underline}>
                  <Typography
                    variant="subtitle1"
                    className={classes.blueColor}
                  >
                    Sign up
                  </Typography>
                </Link>
              </div>
            </Paper>
          </form>
        </Grid>
      </div>
    );
  }
}

export default LoginPage;
