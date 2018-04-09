import * as React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from 'redux/modules/auth/reducer';
import { IEmployee } from 'redux/modules/employees/reducer';
import { Theme, withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Header from 'components/common/header';
import Avatar from 'material-ui/Avatar';
import { GetEmployeesList } from 'redux/modules/employees/actions';
import backgroundColorHelper from 'components/helper/backgroundColorHelper';

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: 20,
    marginBottom: 20,
  },
  disableLinkStyle: {
    textDecoration: 'none',
    color: 'black',
    outline: 'none',
  },
});

interface IStyleProps {
  root: string;
  disableLinkStyle: string;
}

interface IProps {
  classes: IStyleProps;
  user: IUser;
  employees: IEmployee[];
  getEmployeesList: GetEmployeesList;
}

interface IState {
}

class EmployeeList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.getEmployeesList();
  }

  private renderEmployeeProfile(classes: IStyleProps) {
    return this.props.employees.map((item: IEmployee) => (
      <Link
        key={item.id}
        to={{
          pathname: `/employees/${item.id}`,
          state: { employee: item },
        }}
        className={classes.disableLinkStyle}
      >
        <ListItem dense button>
          <Avatar alt={item.LastName} src={item.PhotoUrl} />
          <ListItemText primary={`${item.FirstName} ${item.LastName}`} />
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
          <Header title="List Of Employees" />
          <Grid item xs={11} sm={8} md={5} lg={4} xl={3}>
            <Grid container justify="center">
              <div className={classes.root}>
                <Paper elevation={1}>
                  <List>{this.props.employees && this.renderEmployeeProfile(classes)}</List>
                </Paper>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(EmployeeList);
