import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  IEmployee,
  ICareerDay,
  ICareerDayOfEmployee
} from '../../../redux/modules/employees/reducer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PersonIcon from '@material-ui/icons/Person';
import Header from '../../common/header';
import Avatar from '@material-ui/core/Avatar';
import IconStatus from '../../common/icon-status/icon-status-career-day';
import backgroundColorHelper from '../../helper/backgroundColorHelper';
import { ConnectProps } from './EmployeeListContainer';
import { StylesProps } from './StylesContainer';
import { Button } from '@material-ui/core';

interface IProps extends StylesProps, ConnectProps { }

interface IState {
  isActiveNearestCareerDay: boolean,
}

type stateKeys = keyof IState;

class EmployeeList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isActiveNearestCareerDay: true
    };
  }

  public componentDidMount() {
    this.getEmployeesList();
  }

  private toggleState = (name: string) => {
    const propName = name as stateKeys;

    this.setState({ [propName as any]: !this.state[propName] } as Pick<
      IState,
      stateKeys
    >);
  }

  private formatCareerDayDate = (activeCareerDay: ICareerDay | null) => {
    if (!activeCareerDay) {
      return 'no career day';
    }
    return new Date(activeCareerDay.InterviewDate).toLocaleString('en', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    });
  }

  private getEmployeesList = () => {
    this.props.getEmployeesList();
    this.toggleState('isActiveNearestCareerDay');
  }

  private getNearestCareerDay = () => {
    this.props.getNearestCareerDay();
    this.toggleState('isActiveNearestCareerDay');
  }

  private renderNearestCareerDay = () => {
    const { nearestCareerDay, classes, employees } = this.props;
    if (!nearestCareerDay || !employees) {
      return null;
    }
    return nearestCareerDay.map((item: ICareerDayOfEmployee) => (
      <Link
        to={{
          pathname: `/employees/${item.EmployeeId}/career-day/${item.id}`,
          state: { nearestCareerDay: item }
        }}
        className={classes.disableLinkStyle}
      >
        <ListItem dense button>
          <IconStatus isArchived={item.Archived} />
          <ListItemText
            primary={this.getFirstLastNames(employees, item.EmployeeId)}
            secondary={`Interview Date: ${this.formatCareerDayDate(
              item
            )}`}
          />
        </ListItem>
      </Link>
    )
    )
  }

  private getFirstLastNames = (employees: IEmployee[], EmployeeId: string) => {
    return employees.map(employee => {
      if (EmployeeId === employee.id) {
        return `${employee.FirstName} ${employee.LastName}`;
      };
    })
  }

  private renderEmployeeProfile = () => {
    const { employees, classes } = this.props;
    if (!employees) {
      return null;
    }

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
          {item.PhotoUrl ? (
            <Avatar alt={item.LastName} src={item.PhotoUrl} />
          ) : (
              <Avatar>
                <PersonIcon />
              </Avatar>
            )}
          <ListItemText
            primary={`${item.FirstName} ${item.LastName}`}
            secondary={`Career day: ${this.formatCareerDayDate(
              item.ActiveCareerDay,
            )}`}
          />
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
          <Header title={this.state.isActiveNearestCareerDay ?
            'List of Nearest Career Day' :
            'List Of Employees'} />
          <Grid item xs={11} sm={8} md={5} lg={4} xl={3}>
            <Grid container justify="center">
              <Button
                variant="contained"
                disabled={!this.state.isActiveNearestCareerDay}
                color="default"
                onClick={this.getEmployeesList}
              >
                All Employees
              </Button>

              <Button
                variant="contained"
                disabled={this.state.isActiveNearestCareerDay}
                color="default"
                onClick={this.getNearestCareerDay}
              >
                Nearest Career Days
              </Button>
              <div className={classes.root}>
                <Paper elevation={1}>
                  <List>
                    {this.state.isActiveNearestCareerDay && this.renderNearestCareerDay()}
                    {!this.state.isActiveNearestCareerDay && this.props.employees
                      && this.renderEmployeeProfile()}
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
