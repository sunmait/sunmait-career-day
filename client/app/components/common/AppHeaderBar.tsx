import * as React from 'react';
import {Theme, withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

interface IStyleProps {
  root: string;
}


interface IProps {
  classes: IStyleProps;
}

function AppHeaderBar(props: IProps) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar> 
          <img style={{height: 50, width: 'auto', margin: '0 auto'}} src="https://sunmait.com/assets/img/logo.png" />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(AppHeaderBar);