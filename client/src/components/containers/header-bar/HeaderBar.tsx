import '../../../assets/styles/headerBar.scss';

import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ROLES } from '../../../redux/modules/oidc/constants';
import { ConnectProps } from './ConnectContainer';
import { StylesProps } from './StylesContainer';
import logo from '../../../assets/images/logo.svg';
import PersonIcon from '@material-ui/icons/Person';
import userManager from '../../../utils/oidcUserManager';

interface IProps extends ConnectProps, StylesProps {}

interface IState {
  anchorEl: any;
  open: boolean;
}

class HeaderBar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.menuRef = null;
    this.state = {
      anchorEl: null,
      open: true,
    };
  }

  private menuRef: HTMLElement | null;

  private handleProfileClick = () => {
    this.setState({ anchorEl: this.menuRef });
  }

  private handleLogoutClick = () => {
    this.handleClose();

    userManager.signoutRedirect();
  }

  private handleClose = () => {
    this.setState({ anchorEl: null });
  }

  public renderUserProfile = () => {
    const { user, classes } = this.props;

    return (
      <React.Fragment>
        <Grid item sm={4} xs={12}>
          <Grid
            container
            spacing={0}
            justify="flex-end"
            alignItems="center"
            onClick={this.handleProfileClick}
          >
            <div className={classes.hover} onClick={this.handleProfileClick}>
              <Typography variant="subtitle1" className="header-bar-username">
                {user &&
                  `${user.profile.given_name} ${user.profile.family_name}`}
              </Typography>
              <div
                ref={div => {
                  this.menuRef = div;
                }}
                style={{ display: 'inline-block' }}
              >
                {user && user.profile.PhotoUrl ? (
                  <Avatar alt="Username" src={user.profile.PhotoUrl} />
                ) : (
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                )}
              </div>
            </div>
          </Grid>
        </Grid>
        <Menu
          id="simple-menu"
          className={classes.menuDown}
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
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleLogoutClick}>Logout</MenuItem>
        </Menu>
      </React.Fragment>
    );
  }

  public render() {
    const UserProfile = this.props.user ? this.renderUserProfile() : null;
    const justify = this.props.user ? 'flex-end' : 'center';
    const link =
      this.props.user && this.props.user.profile.role === ROLES.UNIT_MANAGER
        ? '/employees'
        : '/employee';

    return (
      <Grid item xs={12} id="header-bar">
        <AppBar position="static" color="default">
          <Toolbar>
            <Grid container spacing={8} justify={justify} alignItems="center">
              <Grid
                item
                sm={4}
                xs={12}
                className={this.props.user ? 'hide-on-mobile' : ''}
              >
                <Link to={link} className="header-bar-link">
                  <img className="header-bar-image" src={logo} />
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
