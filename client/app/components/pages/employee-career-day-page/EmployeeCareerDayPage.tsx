import * as React from 'react';
import { match } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Header from 'components/common/header';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { IUser } from 'redux/modules/auth/reducer';
import {
  ICareerDayOfEmployee,
  IEmployee,
  IObjectiveById,
  IUpdateObjective,
} from 'redux/modules/employees/reducer';
import { GetSelectedCareerDay, AddObjective, UpdateObjective } from 'redux/modules/employees/actions';
import backgroundColorHelper from 'components/helper/backgroundColorHelper';
import AddObjectivePopup from './add-objective-popup';
import Objective from './objective';

const styles = {
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  navigation: {
    marginTop: 20,
  },
};

interface IStylesProps {
  root: string;
  navigation: string;
}

interface IMatchParams {
  careerDayId: number;
}

interface IProps {
  classes: IStylesProps;
  tooltip: JSX.Element;
  user: IUser;
  addObjective: AddObjective;
  selectedCareerDay: ICareerDayOfEmployee;
  selectedEmployee: IEmployee;
  getSelectedCareerDay: GetSelectedCareerDay;
  match: match<IMatchParams>;
  updateObjective: UpdateObjective;
}

interface IState {
  isOpen: boolean;
}

class EmployeeCareerDayPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  public componentWillMount() {
    this.props.getSelectedCareerDay(this.props.match.params.careerDayId);
  }

  private togglePopupState() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  private handleAddObjective(objective: IObjectiveById) {
    const objectiveByCareerDayId = { ...objective, CareerDayId: this.props.match.params.careerDayId };

    this.props.addObjective(objectiveByCareerDayId);
  }

  private handleSaveObjective(updatedObjective: IUpdateObjective) {
    this.props.updateObjective(updatedObjective);
  }

  private renderObjectives() {
    return this.props.selectedCareerDay.Objectives.map(item => (
      <Objective
        key={item.id}
        objectiveId={item.id}
        title={item.Title}
        description={item.Description}
        statusId={item.StatusId}
        handleSaveObjective={(objective: IUpdateObjective) => this.handleSaveObjective(objective)}
      />
    ));
  }

  public render() {
    const { classes } = this.props;

    backgroundColorHelper();

    return (
      <div>
        <Grid container justify="center" spacing={0}>
          <Header
            title={`${this.props.selectedEmployee.FirstName} ${
              this.props.selectedEmployee.LastName
              }'s career day`}
          />
          <Grid item xs={5}>
            <Grid container justify="flex-end" className={classes.navigation}>
              <Grid item>
                <Grid container spacing={8}>
                  <Grid item>
                    <Button
                      raised
                      color="primary"
                      onClick={() => this.togglePopupState()}
                    >
                      Add objective
                    </Button>
                  </Grid>

                  {this.state.isOpen && (
                    <AddObjectivePopup
                      handleClosePopup={() => this.togglePopupState()}
                      handleAddObjective={(objective: IObjectiveById) => this.handleAddObjective(objective)}
                      open={this.state.isOpen}
                    />
                  )}

                  <Grid item>
                    <Button raised color="primary">
                      Archive
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container justify="center">
              <div className={classes.root}>
                {this.props.selectedCareerDay &&
                this.props.selectedCareerDay.Objectives &&
                this.renderObjectives()}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(EmployeeCareerDayPage);
