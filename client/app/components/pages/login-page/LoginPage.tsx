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
import { Login } from 'redux/modules/auth/actions';
import Header from 'components/common/header';
import { IUser } from 'redux/modules/auth/reducer';
import backgroundColorHelper from 'components/helper/backgroundColorHelper';
import Paper from 'material-ui/Paper';

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '5px 0',
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
  blueColor: {
    color: '#5a87cb',
  },
});

interface IProps {
  login: Login;
  user: IUser;
}

type ComponentClassNames = 'root' | 'button' | 'textField' | 'errorMessage' | 'underline' | 'blueColor';

interface IState {
  isShowedPassword: boolean;
  password: string;
  email: string;
  isValidUserData: boolean;
}

type stateKeys = keyof IState;

class LoginPage extends React.Component<IProps & WithStyles<ComponentClassNames>, IState> {
  constructor(props: IProps & WithStyles<ComponentClassNames>) {
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
    const newState = { [propName as any]: e.target.value };
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
        <FormHelperText id="name-error-text" className={this.props.classes.errorMessage}>
          Login or password is not valid
        </FormHelperText>
      );
    }
  }

  private async verifyUserData() {
    try {
      if (
        this.state.email.length !== 0 &&
        (this.state.password.length >= 6 && this.state.password.length <= 18)) {
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
          <form onSubmit={() => this.props.login(this.state.email, this.state.password)}>
            <Paper>
              <div className={classes.root}>
                <TextField
                  label="Login"
                  className={classes.textField}
                  name="email"
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
                          onMouseDown={(e: React.MouseEvent<HTMLElement>) => LoginPage.handleMouseDownPassword(e)}
                        >
                          {this.state.isShowedPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {this.errorMessage()}
                </FormControl>
              </div>
              <div className={classes.root}>
                <Button
                  raised
                  color="primary"
                  className={classes.button}
                  onClick={() => this.verifyUserData()}
                >
                  Login
                </Button>
              </div>
              <div className={classes.root}>
                <Link to="/signup" className={classes.underline}>
                  <Typography type="subheading" className={classes.blueColor}>Sign up</Typography>
                </Link>
              </div>
            </Paper>
          </form>
        </Grid>
      </div>
    );
  }
}

export default withStyles<ComponentClassNames>(styles)(LoginPage);
