import * as React from 'react';
import Grid from 'material-ui/Grid';
import Input from 'material-ui/Input';
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button';
import Header from '../../common/header';
import { withStyles } from 'material-ui/styles';
import * as regExpHelper from  '../../helper/regExpHelper';

const styles = () => ({
  inputs: {
    marginLeft: 5,
    marginRight: 5,
  },
  errors: {
    marginLeft: 5,
    backgroundColor: '#f2dede',
    borderColor: '#ebccd1',
    color: '#a94442',
  }
});

interface IStylesProps {
  inputs: string,
  errors: string,
}

interface IProps {
  classes: IStylesProps;
}

interface IState {
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  passwordconfirm: string,
  errors: Array<string>,
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
      errors: [],
    };
    this.onChange = this.onChange.bind(this);
  }

  private confirmForm() {
    this.validateForm();
  }

  private validateForm() {
    const letters = /^[A-Za-z]+$/;
    const email = regExpHelper.email;
    let errors: Array<string> = [];

    if (!this.state.firstname.match(letters)) {
      if (this.state.firstname.length === 0) {
        errors.push('The First Name field can not be empty');
      }
      else
        errors.push('The First Name field can contains only letters');
    }
    if (!this.state.lastname.match(letters)) {
      if (this.state.lastname.length === 0) {
        errors.push('The Last Name field can not be empty');
      }
      else
        errors.push('The Last Name field can contains only letters');
    }
    if (!this.state.lastname === null) {
      errors.push('The Last Name field can not be empty');
    }
    if (this.state.password.match(/\W/ || '_')) {
      errors.push('The Password field can contains only letters and numbers');
    }
    if (this.state.password.length < 6) {
      errors.push('The Password minimum length is 6 symbols');
    }
    else if (this.state.password.length > 18) {
      errors.push('The Password maximum length is 18 symbols');
    }
    if (this.state.password !== this.state.passwordconfirm) {
      errors.push('Password Confirmation should be same with Password');
    }
    if (!this.state.email.match(email)) {
      errors.push('Email is not valid');
    }
    this.setState({errors});
  }

  private onChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const prop = event.target.name as stateKeys;
    const newState = {[prop as any]: event.target.value};
    this.setState(newState);
  }

  public render() {
    const {classes} = this.props;

    return (
      <div>
        <Header title="Sign Up" />
        <Grid container>
          <Grid item md={3} />
          <Grid item xs={12} md={6}>
            <Input
              className={classes.inputs}
              placeholder="First Name"
              onChange={(e) => this.onChange(e)}
              fullWidth
              value={this.state.firstname}
              name="firstname"
            />
          </Grid>
          <Grid item md={3} />
          <Grid item md={3} />
          <Grid item xs={12} md={6}>
            <Input
              className={classes.inputs}
              placeholder="Last Name"
              onChange={this.onChange}
              fullWidth
              value={this.state.lastname}
              name="lastname"
            />
          </Grid>
          <Grid item md={3} />
          <Grid item md={3} />
          <Grid item xs={12} md={6}>
            <Input
              className={classes.inputs}
              placeholder="Email"
              onChange={this.onChange}
              fullWidth
              value={this.state.email}
              name="email"
            />
          </Grid>
          <Grid item md={3} />
          <Grid item md={3} />
          <Grid item xs={12} md={6}>
            <Input
              className={classes.inputs}
              placeholder="Password"
              onChange={this.onChange}
              value={this.state.password}
              type="password"
              name="password"
              fullWidth
            />
          </Grid>
          <Grid item md={3} />
          <Grid item md={3} />
          <Grid item xs={12} md={6}>
            <Input
              className={classes.inputs}
              placeholder="Password confirmation"
              onChange={this.onChange}
              value={this.state.passwordconfirm}
              name="passwordconfirm"
              type="password"
              fullWidth
            />
          </Grid>
          <Grid item md={3} />
          <Grid item md={3} />
          <Grid item xs={12} md={6}>
            <Grid container>
              <Grid item xs={10}>
                {this.state.errors.map((error: string) => {
                  return (
                    <div key={error}>
                      <Typography className={classes.errors}>
                        {error}
                      </Typography>
                      <br />
                    </div>
                  )
                })}
              </Grid>
              <Grid item xs={2}>
                <Grid container justify="flex-end">
                  <Button onClick={() => this.confirmForm()}>
                    Confirm
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(SignUpPage);