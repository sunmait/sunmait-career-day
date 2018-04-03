import 'assets/styles/headerBar.less';

import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Menu, { MenuItem } from 'material-ui/Menu';
import {Link} from 'react-router-dom';
import {IUser} from 'redux/modules/auth/reducer';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { ROLES } from 'redux/modules/auth/constants';

interface IProps {
  user: IUser;
}

interface IState {
  anchorEl: any;
}

export default class HeaderBar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  private menuRef: HTMLElement;

  private handleProfileClick = () => {
    this.setState({ anchorEl: this.menuRef });
  }

  private handleLogoutClick = () => {
    // TODO: logout action
    this.handleClose();
  }

  private handleClose = () => {
    this.setState({ anchorEl: null });
  }

  public renderUserProfile = () => {
    return (
      <>
        <Grid item sm={4} xs={12}>
          <Grid
            container
            spacing={0}
            justify="flex-end"
            alignItems="center"
            onClick={this.handleProfileClick}
          >
            <Grid item sm={9} >
              <Typography type="subheading" className="header-bar-username">
                {`${this.props.user.FirstName} ${this.props.user.LastName}`}
              </Typography>
            </Grid>

            <Grid item sm={3}>
              <div
                ref={div => {this.menuRef = div; }}
                style={{display: 'inline-block'}}
              >
                <Avatar alt="Username" src={this.props.user.PhotoUrl} />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleLogoutClick}>Logout</MenuItem>
        </Menu>
      </>
    );
  }

  public render() {
    const UserProfile = (this.props.user) ? this.renderUserProfile() : null;
    const justify = (this.props.user) ? 'flex-end' : 'center';
    const link = (this.props.user && (this.props.user.Roles === ROLES.UNIT_MANAGER)) ? '/employees' : '/employee';

    return (
      <Grid item xs={12} id="header-bar">
        <AppBar position="static" color="default">
          <Toolbar>
            <Grid container spacing={8} justify={justify} alignItems="center">
              <Grid item sm={4} xs={12} className={(this.props.user) ? 'hide-on-mobile' : ''}>
                <Link to={link} className="header-bar-link">
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
