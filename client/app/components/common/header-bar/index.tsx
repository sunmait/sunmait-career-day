import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import {Link} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import 'assets/styles/headerBar.less';

const HeaderBar = () => {
  const logo = require('assets/logo.png');

  return (
      <Grid item xs={12}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Grid container spacing={8} justify="flex-end" alignItems="center">
              <Grid item xs={4}>
                <Link to="/employees" className="header-bar-link">
                  <img className="header-bar-image" src={logo} />
                </Link>
              </Grid>

              <Grid item xs={3}>
                <Typography type="subheading" className="header-bar-username">Username</Typography>
              </Grid>

              <Grid item xs={1}>
                <Avatar alt="Username" src="https://vk.com/images/camera_200.png" />
              </Grid>
            </Grid>
          </Toolbar>
          </AppBar>
      </Grid>
  );
};

export default HeaderBar;
