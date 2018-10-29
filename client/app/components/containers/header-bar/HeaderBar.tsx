import 'assets/styles/headerBar.less';

import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ROLES } from 'redux/modules/auth/constants';
import { ConnectProps } from './ConnectContainer';
import { StylesProps } from './StylesContainer';

interface IProps extends ConnectProps, StylesProps {
}

interface IState {
  anchorEl: any;
  open: boolean;
}

class HeaderBar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      anchorEl: null,
      open: true,
    };
  }

  private menuRef: HTMLElement;

  private handleProfileClick() {
    this.setState({ anchorEl: this.menuRef });
  }

  private handleLogoutClick() {
    this.handleClose();
    const refreshToken: string = localStorage.getItem('RefreshToken');

    this.props.logout(refreshToken);
  }

  private handleClose() {
    this.setState({ anchorEl: null });
  }

  public renderUserProfile() {
    return (
      <React.Fragment>
        <Grid item sm={4} xs={12}>
          <Grid
            container
            spacing={0}
            justify="flex-end"
            alignItems="center"
            onClick={() => this.handleProfileClick()}
          >
            <div className={this.props.classes.hover} onClick={() => this.handleProfileClick()}>
              <Typography variant="subtitle1" className="header-bar-username">
                {`${this.props.user.FirstName} ${this.props.user.LastName}`}
              </Typography>
              <div
                ref={div => {
                  this.menuRef = div;
                }}
                style={{ display: 'inline-block' }}
              >
                <Avatar alt="Username" src={this.props.user.PhotoUrl} />
              </div>
            </div>
          </Grid>
        </Grid>
        <Menu
          id="simple-menu"
          className={this.props.classes.menuDown}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(this.state.anchorEl)}
          onClose={() => this.handleClose()}
        >
          <MenuItem onClick={() => this.handleLogoutClick()}>Logout</MenuItem>
        </Menu>
      </React.Fragment>
    );
  }

  public render() {
    const UserProfile = this.props.user ? this.renderUserProfile() : null;
    const justify = this.props.user ? 'flex-end' : 'center';
    const link =
      this.props.user && this.props.user.Role === ROLES.UNIT_MANAGER ? '/employees' : '/employee';

    return (
      <Grid item xs={12} id="header-bar">
        <AppBar position="static" color="default">
          <Toolbar>
            <Grid container spacing={8} justify={justify} alignItems="center">
              <Grid item sm={4} xs={12} className={this.props.user ? 'hide-on-mobile' : ''}>
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

export default HeaderBar;
