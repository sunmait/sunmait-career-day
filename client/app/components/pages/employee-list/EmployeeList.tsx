import './EmployeesList.less';

import * as React from 'react';
import {IUser} from 'redux/modules/auth/authReducer';
import {IEmployees} from 'redux/modules/employees/employeesReducer';
import {Theme, withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Archive from 'material-ui-icons/Archive';
import TimeLine from 'material-ui-icons/Timeline';
import Avatar from 'material-ui/Avatar';
import ControlledTooltips from 'components/common/ControlledTooltips ';
import * as employeesAction from 'redux/modules/employees/employeesAction';

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    marginTop: 20,
  },
});

interface IEmployeeListProps {
  classes: any;
  user: IUser;
  employeesProfile: IEmployees[];
  getEmployeesList: employeesAction.GetEmployeesList;
}

interface IEmployeeListState {
}

class EmployeeList extends React.Component<IEmployeeListProps, IEmployeeListState> {
  constructor(props: IEmployeeListProps) {
    super(props);
  }

  public componentWillMount() {
    this.props.getEmployeesList();
  }

  public renderEmployeeProfile = () => {
    const employeesProfile: IEmployees[] = this.props.employeesProfile;

    return (
      employeesProfile.map((item: IEmployees) => (
        <ListItem key={item.id} dense button className={this.props.classes.listItem}>
          <Avatar alt={item.fullName} src={item.photoUrl} />
          <ListItemText primary={item.fullName} />
          <ListItemSecondaryAction>
            {item.archived ?
              <ControlledTooltips
                title="Archived"
                tooltip={<Archive />}
              />
              :
              <ControlledTooltips
                title="In Progress"
                tooltip={<TimeLine />}
              />
            }
          </ListItemSecondaryAction>
        </ListItem>
      ))
    );
  }

  public render() {
    const {classes} = this.props;

    return (
      <div className="employees-list">
        <Grid item md={12} style={{padding: 15, backgroundColor: 'lightblue'}}>
          <Typography type="display2" align="center" style={{marginBottom: 10}}>List Of Employees</Typography>
        </Grid>

        <Grid container justify="center" spacing={0}>
          <div className={classes.root}>
            <List>
              {this.props.employeesProfile.length > 0 &&
              this.renderEmployeeProfile()
              }
            </List>
          </div>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(EmployeeList);
