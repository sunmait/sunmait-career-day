import 'assets/styles/backgrounds/greyBackground.less';

import * as React from 'react';
import {Link} from 'react-router-dom';
import {IUser} from 'redux/modules/auth/authReducer';
import {IEmployees} from 'redux/modules/employees/employeesReducer';
import {Theme, withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Header from 'components/common/Header';
import Avatar from 'material-ui/Avatar';
import IconStatus from 'components/common/IconStatus';
import * as employeesAction from 'redux/modules/employees/employeesAction';

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    marginTop: 20,
  },
  header: {
    padding: 15,
    backgroundColor: 'lightblue',
  },
});

interface IStyleProps {
  root: string;
  header: string;
}

interface IEmployeeListProps {
  classes: IStyleProps;
  user: IUser;
  employees: IEmployees[];
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
    return (
      this.props.employees.map((item: IEmployees) => (
        <Link key={item.id} to={`/employees/${item.id}`} style={{textDecoration: 'none'}}>
          <ListItem dense button>
            <Avatar alt={item.fullName} src={item.photoUrl} />
            <ListItemText primary={item.fullName} />
            <ListItemSecondaryAction>
              {IconStatus(item.archived)}
            </ListItemSecondaryAction>
          </ListItem>
        </Link>
      ))
    );
  }

  public render() {
    const {classes} = this.props;

    return (
      <div className="grey-background">
        <Grid item md={12} className={classes.header}>
          {Header('List Of Employees')}
        </Grid>

        <Grid container justify="center" spacing={0}>
          <div className={classes.root}>
            <List>
              {this.props.employees && this.renderEmployeeProfile()}
            </List>
          </div>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(EmployeeList);
