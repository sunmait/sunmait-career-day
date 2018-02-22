import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import {Link} from 'react-router-dom';

function AppHeaderBar() {
  const logo = require('assets/logo.png');
  return (
    <div >
      <AppBar position="static" color="default">
        <Toolbar> 
          <Link to={{ pathname: `/employees`}} style={{ width: '100%'}}>
            <img style={{height: 50, width: 'auto', margin: '0 auto', display: 'block'}} src={logo} />
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppHeaderBar;