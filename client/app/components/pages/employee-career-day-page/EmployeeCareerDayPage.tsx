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
import AddObjectivePopup from './add-objective-popup';
import Objective from './objective';
import {
  GetSelectedCareerDay,
  AddObjective,
  UpdateObjective,
  ArchiveCareerDay,
} from 'redux/modules/employees/actions';
import backgroundColorHelper from 'components/helper/backgroundColorHelper';
import ConfirmationPopup from 'components/common/popups/confirmation-popup';
import ControlledTooltips from 'components/common/controlled-tooltips';
import * as moment from 'moment';

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
  archiveCareerDay: ArchiveCareerDay;
}

interface IState {
  isOpenEditObjectivePopup: boolean;
  isOpenArchiveCDPopup: boolean;
}

class EmployeeCareerDayPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isOpenEditObjectivePopup: false,
      isOpenArchiveCDPopup: false,
    };
  }

  public componentWillMount() {
    this.props.getSelectedCareerDay(this.props.match.params.careerDayId);
  }

  private toggleEditObjectivePopupState() {
    this.setState({
      isOpenEditObjectivePopup: !this.state.isOpenEditObjectivePopup,
    });
  }

  private toggleArchiveCDPopupState() {
    this.setState({ isOpenArchiveCDPopup: !this.state.isOpenArchiveCDPopup });
  }

  private handleAddObjective(objective: IObjectiveById) {
    const objectiveByCareerDayId = {
      ...objective,
      CareerDayId: this.props.match.params.careerDayId,
    };

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
        handleSaveObjective={(objective: IUpdateObjective) =>
          this.handleSaveObjective(objective)
        }
      />
    ));
  }
  private isActiveAddObjectiveButton() {
    if (this.props.selectedCareerDay) {
      return this.props.selectedCareerDay.Archived;
    }

    return true;
  }

  private handleArchiveCareerDay() {
    this.props.archiveCareerDay(this.props.selectedCareerDay.id);
    this.toggleArchiveCDPopupState();
  }

  private acrhiveButtonText() {
    if (this.props.selectedCareerDay && this.props.selectedCareerDay.Archived) {
      return 'Archived';
    }

    return 'Archive';
  }

  private getArchiveButtonTitle() {
    return this.props.selectedCareerDay &&
      moment(this.props.selectedCareerDay.InterviewDate) > moment()
      ? 'Can be archived only after interview date of CD.'
      : 'The career day archived.';
  }

  private isActiveArchiveButton() {
    if (this.props.selectedCareerDay) {
      return moment(this.props.selectedCareerDay.InterviewDate) < moment()
        ? this.props.selectedCareerDay.Archived
        : true;
    }

    return true;
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
                    <ControlledTooltips
                      title={'The career day archived.'}
                      isDisabled={this.isActiveAddObjectiveButton()}
                      tooltip={
                        <Button
                          raised
                          disabled={this.isActiveAddObjectiveButton()}
                          color="primary"
                          onClick={() => this.toggleEditObjectivePopupState()}
                        >
                          Add objective
                        </Button>
                      }
                    />
                  </Grid>

                  <Grid item>
                    <ControlledTooltips
                      title={this.getArchiveButtonTitle()}
                      isDisabled={this.isActiveArchiveButton()}
                      tooltip={
                        <Button
                          disabled={this.isActiveArchiveButton()}
                          raised
                          color="primary"
                          onClick={() => this.toggleArchiveCDPopupState()}
                        >
                          {this.acrhiveButtonText()}
                        </Button>
                      }
                    />
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

        {this.state.isOpenEditObjectivePopup && (
          <AddObjectivePopup
            handleClosePopup={() => this.toggleEditObjectivePopupState()}
            handleAddObjective={(objective: IObjectiveById) =>
              this.handleAddObjective(objective)
            }
            open={this.state.isOpenEditObjectivePopup}
          />
        )}
        {this.state.isOpenArchiveCDPopup && (
          <ConfirmationPopup
            handleClosePopup={() => this.toggleArchiveCDPopupState()}
            handleConfirm={() => this.handleArchiveCareerDay()}
            open={this.state.isOpenArchiveCDPopup}
            title={'Archive this career day?'}
            description="After archiving, you cann't edit a career day!"
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(EmployeeCareerDayPage);
