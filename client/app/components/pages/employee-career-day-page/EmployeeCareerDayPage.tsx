import * as React from 'react';
import {Theme, withStyles} from 'material-ui/styles';
import Header from 'components/common/Header';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Edit from 'material-ui-icons/Edit';
import Delete from 'material-ui-icons/Delete';
import * as employeesAction from 'redux/modules/employees/employeesAction';
import {IUser} from 'redux/modules/auth/authReducer';
import {IEmployeeFullName, IObjectives} from 'redux/modules/employees/employeesReducer';
import List, {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import IconStatus from 'components/common/IconStatus';
import setBackgroundHelper from 'components/helper/setBackgroundHelper';

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 730,
    backgroundColor: theme.palette.background.paper,
    marginTop: 20,
  },
  navigation: {
    marginTop: 20,
    padding: '0 20px 0 20px',
  },
  options: {
    margin: 10,
  },
});

interface IStylesProps {
  root: string;
  options: string;
  navigation: string;
}

interface IEmployeeCareerDayProps {
  classes: IStylesProps;
  tooltip: JSX.Element;
  getObjectives: employeesAction.GetObjectives;
  user: IUser;
  employeeFullName: IEmployeeFullName;
  objectives: IObjectives[];
}

interface IEmployeeCareerDayState {
}

class EmployeeCareerDayPage extends React.Component<IEmployeeCareerDayProps, IEmployeeCareerDayState> {
  constructor(props: IEmployeeCareerDayProps) {
    super(props);
  }

  public componentWillMount() {
    this.props.getObjectives();
  }

  public renderObjectives = (classes: IStylesProps) => {
    return (
      this.props.objectives.map(item => (
        <ListItem key={item.id} dense button>
          {IconStatus(true)}
          <ListItemText primary={item.Text} />
          <ListItemSecondaryAction>
            <Edit className={classes.options} />
            <Delete className={classes.options} />
          </ListItemSecondaryAction>
        </ListItem>
      ))
    );
  }

  public render() {
    const {classes} = this.props;

    setBackgroundHelper();

    return (
      <div>
        <Grid container justify="center" spacing={0}>
          <Grid item xs={5}>
            <Header title="Employee's career day" />
            <Grid container justify="space-between" className={classes.navigation}>

              <Grid item xs={5}>
                <Typography noWrap type="headline">{this.props.employeeFullName}</Typography>
              </Grid>

              <Grid item>
                <Grid container spacing={8}>
                  <Grid item>
                    <Button
                      raised
                      color="primary"
                    >
                      Add objective
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      raised
                      color="primary"
                    >
                      Archive
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container justify="center">
              <div className={classes.root}>
                <List>
                  {this.props.objectives && this.renderObjectives(classes)}
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
