import * as React from 'react';
import { Link } from 'react-router-dom';
import { IEmployee } from 'redux/modules/employees/reducer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Header from 'components/common/header';
import Avatar from '@material-ui/core/Avatar';
import backgroundColorHelper from 'components/helper/backgroundColorHelper';
import { ConnectProps } from './ConnectContainer';
import { StylesProps } from './StylesContainer';

interface IProps extends StylesProps, ConnectProps {}

interface IState {}

class EmployeeList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.getEmployeesList();
  }

  private renderEmployeeProfile() {
    const { employees, classes } = this.props;

    return employees.map((item: IEmployee) => (
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
                  <List>
                    {this.props.employees && this.renderEmployeeProfile()}
                  </List>
                </Paper>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default EmployeeList;
