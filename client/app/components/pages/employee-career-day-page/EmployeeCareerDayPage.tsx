import 'assets/styles/backgrounds/defaultBackground.less';

import * as React from 'react';
import {Theme, withStyles} from 'material-ui/styles';
import Header from 'components/common/Header';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import List from 'material-ui/List';

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 730,
    backgroundColor: theme.palette.background.paper,
    marginTop: 20,
  },
  profileHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 20,
  } as React.CSSProperties,
  options: {
    margin: 10,
  },
});

interface IStylesProps {
  root: string;
  profileHeader: string;
  options: string;
}

interface IEmployeeCareerDayProps {
  classes: IStylesProps;
  tooltip: JSX.Element;
  employeeFullName: string;
}

interface IEmployeeCareerDayState {

}

class EmployeeCareerDayPage extends React.Component<IEmployeeCareerDayProps, IEmployeeCareerDayState> {

  public render() {
    const {classes} = this.props;

    return (
      <div className="default-background">
        <Grid container justify="center">
          <Grid item xs={6}>
            <Header title="List Of Objectives" />
            <Grid item className={classes.profileHeader}>
              <Typography noWrap type="headline">Full Name</Typography>
            </Grid>
            <Button
              raised
              color="primary"
            >
              Add objective
            </Button>
            <Button
              raised
              color="primary"
            >
              Archive
            </Button>
            <Grid item>
              <div className={classes.root}>
                <List>

                </List>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(EmployeeCareerDayPage);