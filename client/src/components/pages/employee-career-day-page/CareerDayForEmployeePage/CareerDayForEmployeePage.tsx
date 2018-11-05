import * as React from 'react';
import Header from '../../../common/header/index';
import Grid from '@material-ui/core/Grid';
import {
  IUpdateObjectiveEmployee,
  IUpdateObjectiveManager,
} from '../../../../redux/modules/employees/reducer';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import DatetimeList from '../datetime-list/index';
import Objective from '../objective/index';
import backgroundColorHelper from '../../../helper/backgroundColorHelper';
import { ConnectProps } from './ConnectContainer';
import { StylesProps } from './StylesContainer';

interface IProps extends ConnectProps, StylesProps {}

interface IState {}

class CareerDayForEmployeePage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public componentDidMount() {
    if (this.props.user) {
      this.props.getActiveCareerDay(this.props.user.id);
    }
  }

  private handleSaveObjective = (
    updatedObjectiveProgress:
      | IUpdateObjectiveEmployee
      | IUpdateObjectiveManager,
  ) => {
    this.props.updateObjectiveEmployee(
      updatedObjectiveProgress as IUpdateObjectiveEmployee,
    );
  }

  private renderObjectives = () => {
    const { user, activeCareerDay } = this.props;
    if (user && activeCareerDay && activeCareerDay.Objectives) {
      return activeCareerDay.Objectives.map(item => (
        <Objective
          key={item.id}
          objective={item}
          userRole={user.Role}
          handleSaveObjective={this.handleSaveObjective}
        />
      ));
    }
    return (
      <Paper elevation={1}>
        <Typography align="center" className={this.props.classes.paper}>
          This employee doesn't have career day.
        </Typography>
      </Paper>
    );
  }

  public render() {
    const { classes, activeCareerDay, user } = this.props;

    backgroundColorHelper();
    return (
      <div>
        <Grid container justify="center" spacing={0}>
          <Header
            title={
              (user && `${user.FirstName} ${user.LastName}'s career day`) ||
              'Career day'
            }
          />
          <Grid item xs={11} sm={8} md={5} lg={4} xl={3}>
            <Grid container justify="center">
              <div className={classes.datetime}>
                {activeCareerDay &&
                  activeCareerDay.CreatedAt && (
                    <DatetimeList selectedCareerDay={activeCareerDay} />
                  )}
              </div>
            </Grid>

            <Grid container justify="center">
              <div className={classes.root}>{this.renderObjectives()}</div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default CareerDayForEmployeePage;
