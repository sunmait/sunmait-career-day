import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Header from 'components/common/header';
import UserFormInput from './user-form-input';
import * as regExpHelper from 'components/helper/regExpHelper';
import backgroundColorHelper from 'components/helper/backgroundColorHelper';
import Paper from '@material-ui/core/Paper';
import { ConnectProps } from './ConnectContainer';
import { StylesProps } from './StylesContainer';

interface IProps extends ConnectProps, StylesProps {
}

interface IState {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordconfirm: string;
  errors: IErrors;
  isConfirmed: boolean;
}

interface IErrors {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  passwordconfirm?: string;
}

type stateKeys = keyof IState;

class SignUpPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      passwordconfirm: '',
      password: '',
      errors: {},
      isConfirmed: false,
    };
    this.onChange = this.onChange.bind(this);
  }

  private confirmForm() {
    this.validateForm();
  }

  private signUpUser() {
    const user = {
      FirstName: this.state.firstname,
      LastName: this.state.lastname,
      Email: this.state.email,
      Password: this.state.password,
    };

    const errors = this.state.errors;

    if (
      !errors.firstname &&
      !errors.lastname &&
      !errors.email &&
      !errors.password &&
      !errors.passwordconfirm
    ) {
      this.props.signUp(user);
    }
  }

  private validateForm() {
    const letters = /^[A-Za-z]+$/;
    const email = regExpHelper.email;
    const errors: IErrors = {};

    if (!this.state.firstname.match(letters)) {
      if (this.state.firstname.length === 0) {
        errors.firstname = 'The First Name field can not be empty';
      } else {
        errors.firstname = 'The First Name field can contains only letters';
      }
    }
    if (!this.state.lastname.match(letters)) {
      if (this.state.lastname.length === 0) {
        errors.lastname = 'The Last Name field can not be empty';
      } else {
        errors.lastname = 'The Last Name field can contains only letters';
      }
    }
    if (!this.state.lastname === null) {
      errors.lastname = 'The Last Name field can not be empty';
    }
    if (this.state.password.match(/\W/ || '_')) {
      errors.password = 'The Password field can contains only letters and numbers';
    }
    if (this.state.password.length < 6) {
      errors.password = 'The Password minimum length is 6 symbols';
    } else if (this.state.password.length > 18) {
      errors.password = 'The Password maximum length is 18 symbols';
    }
    if (this.state.password !== this.state.passwordconfirm) {
      errors.passwordconfirm = 'Password Confirmation should be same with Password';
    }
    if (!this.state.email.match(email)) {
      errors.email = 'Email is not valid';
    }
    this.setState({ errors, isConfirmed: true }, () => this.signUpUser());
  }

  private onChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const prop = event.target.name as stateKeys;
    const newState = { [prop as any]: event.target.value } as Pick<IState, stateKeys>;
    this.setState(newState, function() {
      if (this.state.isConfirmed) {
        this.validateForm();
      }
    });
  }

  public render() {
    const { classes } = this.props;

    backgroundColorHelper();
    return (
      <div>
        <Grid container justify="center" spacing={0}>
          <Header title="Sign Up" />
          <Grid item xs={11} sm={8} md={5} lg={4} xl={3}>
            <Grid container justify="center" direction="column" alignItems="stretch" spacing={0}>
              <Paper>
                <Grid item xs={10} sm={11}>
                  <UserFormInput
                    label="firstname"
                    title="First Name"
                    value={this.state.firstname}
                    error={('firstname' in this.state.errors) ? this.state.errors.firstname : null}
                    handleChangeValue={e => this.onChange(e)}
                  />
                </Grid>
                <Grid item xs={10} sm={11}>
                  <UserFormInput
                    label="lastname"
                    title="Last Name"
                    value={this.state.lastname}
                    error={('lastname' in this.state.errors) ? this.state.errors.lastname : null}
                    handleChangeValue={e => this.onChange(e)}
                  />
                </Grid>
                <Grid item xs={10} sm={11}>
                  <UserFormInput
                    label="email"
                    title="Email"
                    value={this.state.email}
                    error={('email' in this.state.errors) ? this.state.errors.email : null}
                    handleChangeValue={e => this.onChange(e)}
                  />
                </Grid>
                <Grid item xs={10} sm={11}>
                  <UserFormInput
                    label="password"
                    title="Password"
                    value={this.state.password}
                    type="password"
                    error={('password' in this.state.errors) ? this.state.errors.password : null}
                    handleChangeValue={e => this.onChange(e)}
                  />
                </Grid>
                <Grid item xs={10} sm={11}>
                  <UserFormInput
                    label="passwordconfirm"
                    title="Password confirmation"
                    value={this.state.passwordconfirm}
                    type="password"
                    error={('passwordconfirm' in this.state.errors) ? this.state.errors.passwordconfirm : null}
                    handleChangeValue={e => this.onChange(e)}
                  />
                </Grid>
                <Grid item className={classes.button}>
                  <Grid container justify="center" alignItems="center" spacing={8}>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.confirmForm()}
                      >
                        Confirm
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default SignUpPage;
