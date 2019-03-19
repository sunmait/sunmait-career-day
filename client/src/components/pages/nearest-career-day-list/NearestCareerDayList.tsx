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
import Header from '../../common/header';
import IconStatus from '../../common/icon-status/icon-status-career-day';
import backgroundColorHelper from '../../helper/backgroundColorHelper';
import { ConnectProps } from './NearestCareerDayListContainer';
import { StylesProps } from '../employee-list/StylesContainer';
import ButtonLink from './../../common/button-link';

interface IProps extends StylesProps, ConnectProps { }

class NearestCareerDayList extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.getNearestCareerDay();
  }

  private formatNearestCareerDayDate = (nearestCareerDay: ICareerDay | null) => {
    if (!nearestCareerDay) {
      return 'no career day';
    }
    return new Date(nearestCareerDay.InterviewDate).toLocaleString('en', {
      month: 'long',
      day: '2-digit',
    });
  }

  private renderNearestCareerDay = () => {
    const { nearestCareerDay, classes, employees } = this.props;
    if (!nearestCareerDay || !employees) {
      return null;
    }
    return nearestCareerDay.map((item: ICareerDayOfEmployee) => (
      <Link
        key={item.id}
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
            secondary={`Interview Date: ${this.formatNearestCareerDayDate(
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

  public render() {
    const { classes } = this.props;

    backgroundColorHelper();

    return (
      <div>
        <Grid container spacing={0} justify="center">
          <Header title='List of Nearest Career Days' />
          <Grid item xs={11} sm={8} md={5} lg={4} xl={3}>
            <Grid container justify="center">
              <ButtonLink
                to={`/employees`}
                classes={classes}
                primary='Employees'
                isDisabled={false}
              />
              <ButtonLink
                to={`/nearest-career-day`}
                classes={classes}
                primary='Nearest Career Days'
                isDisabled={true}
              />
              <div className={classes.root}>
                <Paper elevation={1}>
                  <List>
                    {this.renderNearestCareerDay()}
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

export default NearestCareerDayList;
