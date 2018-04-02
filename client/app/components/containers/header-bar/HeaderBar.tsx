import 'assets/styles/headerBar.less';

import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import {Link} from 'react-router-dom';
import {IUser} from 'redux/modules/auth/reducer';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

interface IProps {
  user: IUser;
}

interface IState {}

export default class HeaderBar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  public renderUserProfile = () => {
    return (
      <Grid item sm={4} xs={12}>
        <Grid container spacing={0} justify="flex-end" alignItems="center">
          <Grid item sm={9}>
            <Typography type="subheading" className="header-bar-username">
              {`${this.props.user.FirstName} ${this.props.user.LastName}`}
            </Typography>
          </Grid>

          <Grid item sm={3}>
            <Avatar alt="Username" src={this.props.user.PhotoUrl} />
          </Grid>
        </Grid>
      </Grid>
    );
  }

  public render() {
    const UserProfile = (this.props.user) ? this.renderUserProfile() : null;
    const justify = (this.props.user) ? 'flex-end' : 'center';

    return (
      <Grid item xs={12} id="header-bar">
        <AppBar position="static" color="default">
          <Toolbar>
            <Grid container spacing={8} justify={justify} alignItems="center">
              <Grid item sm={4} xs={12} className={(this.props.user) ? 'hide-on-mobile' : ''}>
                <Link to="/employees" className="header-bar-link">
                  <img className="header-bar-image" src={require('assets/images/logo.svg')} />
                </Link>
              </Grid>
              {UserProfile}
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    );
  }
}
