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
import setBackgroundHelper from 'components/helper/setBackgroundHelper';

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    marginTop: 20,
  },
  header: {
    padding: 15,
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

    setBackgroundHelper();

    return (
      <div>
        <Grid container spacing={0} justify="center">
          <Grid item md={12} className={classes.header}>
            <Header title="List Of Employees" />
          </Grid>
          <Grid item className={classes.root}>
            <List>
              {this.props.employees && this.renderEmployeeProfile()}
            </List>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(EmployeeList);
