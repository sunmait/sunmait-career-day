import * as React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from 'redux/modules/auth/reducer';
import { IEmployee } from 'redux/modules/employees/reducer';
import { Theme, withStyles } from 'material-ui/styles';
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Header from 'components/common/header';
import Avatar from 'material-ui/Avatar';
import IconStatus from 'components/common/icon-status';
import * as employeesAction from 'redux/modules/employees/action';
import backgroundColorHelper from 'components/helper/backgroundColorHelper';

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

interface IProps {
  classes: IStyleProps;
  user: IUser;
  employees: IEmployee[];
  getEmployeesList: employeesAction.GetEmployeesList;
}

interface IState {}

class EmployeeList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  public componentWillMount() {
    this.props.getEmployeesList();
  }

  public renderEmployeeProfile = () => {
    return this.props.employees.map((item: IEmployee) => (
      <Link
        key={item.id}
        to={{
          pathname: `/employees/${item.id}`,
          state: { employee: item },
        }}
        style={{ textDecoration: 'none' }}
      >
        <ListItem dense button>
          <Avatar alt={item.LastName} src={item.PhotoUrl} />
          <ListItemText primary={`${item.FirstName} ${item.LastName}`} />
          <ListItemSecondaryAction>
            <IconStatus isArchived={false} />
          </ListItemSecondaryAction>
        </ListItem>
      </Link>
    ));
  }

  public render() {
    const { classes } = this.props;

    backgroundColorHelper();

    return (
      <div>
        <Grid container spacing={0} justify="center">
          <Grid item md={12} className={classes.header}>
            <Header title="List Of Employees" />
          </Grid>
          <Grid item className={classes.root}>
            <List>{this.props.employees && this.renderEmployeeProfile()}</List>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(EmployeeList);
