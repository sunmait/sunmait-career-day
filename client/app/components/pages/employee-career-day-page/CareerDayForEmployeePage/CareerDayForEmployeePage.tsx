import * as React from 'react';
import { IUser } from 'redux/modules/auth/reducer';
import Header from 'components/common/header/index';
import Grid from 'material-ui/Grid';
import {
  ICareerDayOfEmployee,
  IUpdateObjectiveEmployee,
} from 'redux/modules/employees/reducer';
import {
  GetActiveCareerDay,
  UpdateObjectiveEmployee,
} from 'redux/modules/employees/actions';
import { withStyles, WithStyles } from 'material-ui/styles';
import DatetimeList from '../datetime-list/index';
import Objective from '../objective/index';
import backgroundColorHelper from 'components/helper/backgroundColorHelper';

const styles = {
  root: {
    flexGrow: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  navigation: {
    marginTop: 10,
    marginBottom: 10,
  },
  datetime: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
};

type ComponentClassNames = 'root' | 'navigation' | 'datetime';

interface IProps {
  user: IUser;
  activeCareerDay: ICareerDayOfEmployee;
  getActiveCareerDay: GetActiveCareerDay;
  updateObjectiveEmployee: UpdateObjectiveEmployee;
}

interface IState {
}

class CareerDayForEmployeePage extends React.Component<IProps & WithStyles<ComponentClassNames>, IState> {
  constructor(props: IProps & WithStyles<ComponentClassNames>) {
    super(props);
    this.state = {};
  }

  public componentWillMount() {
    this.props.getActiveCareerDay(this.props.user.id);
  }

  private handleSaveObjective(updatedObjectiveProgress: IUpdateObjectiveEmployee) {
    this.props.updateObjectiveEmployee(updatedObjectiveProgress);
  }

  private renderObjectives() {
    return this.props.activeCareerDay.Objectives.map(item => (
      <Objective
        key={item.id}
        objective={item}
        userRole={this.props.user.Roles}
        handleSaveObjective={(objective: IUpdateObjectiveEmployee) => this.handleSaveObjective(objective)}
      />
    ));
  }

  public render() {
    const {classes} = this.props;
    const activeCareerDay: ICareerDayOfEmployee = this.props.activeCareerDay;

    backgroundColorHelper();
    return (
      <div>
        <Grid container justify="center" spacing={0}>
          <Header
            title={`${this.props.user.FirstName} ${
              this.props.user.LastName
              }'s career day`}
          />
          <Grid item xs={5} lg={4} xl={3}>
            <Grid container justify="center">
              <div className={classes.datetime}>
                {activeCareerDay &&
                 activeCareerDay.CreatedAt &&
                <DatetimeList selectedCareerDay={activeCareerDay} />}
              </div>
            </Grid>

            <Grid container justify="center">
              <div className={classes.root}>
                {(
                  this.props.activeCareerDay &&
                  this.props.activeCareerDay.Objectives) &&
                this.renderObjectives()}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles<ComponentClassNames>(styles)(CareerDayForEmployeePage);
