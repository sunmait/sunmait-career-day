import * as React from 'react';
import { match } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import * as moment from 'moment';
import Header from 'components/common/header';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { IUser } from 'redux/modules/auth/reducer';
import {
  ICareerDayOfEmployee,
  IEmployee,
  IObjectiveById,
  IUpdateObjective,
  IUpdateInterviewDate,
} from 'redux/modules/employees/reducer';
import {
  GetSelectedCareerDay,
  AddObjective,
  UpdateObjective,
  DeleteObjective,
  ArchiveCareerDay,
  UpdateInterviewDate,
} from 'redux/modules/employees/actions';
import backgroundColorHelper from 'components/helper/backgroundColorHelper';
import AddObjectivePopup from './popups/add-objective-popup';
import Objective from './objective';
import ConfirmationPopup from 'components/common/popups/confirmation-popup';
import ControlledTooltips from 'components/common/controlled-tooltips';
import EditDatetimePopup from './popups/update-date-popup';
import DatetimeList from './datetime-list';

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

interface IStylesProps {
  root: string;
  navigation: string;
  datetime: string;
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
  deleteObjective: DeleteObjective;
  match: match<IMatchParams>;
  updateObjective: UpdateObjective;
  archiveCareerDay: ArchiveCareerDay;
  updateInterviewDate: UpdateInterviewDate;
}

interface IState {
  isOpenAddPopup: boolean;
  isOpenDeletePopup: boolean;
  isOpenArchiveCDPopup: boolean;
  isOpenDatePopup: boolean;
  objectiveId: number;
}

type stateKeys = keyof IState;

class EmployeeCareerDayPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isOpenAddPopup: false,
      isOpenDeletePopup: false,
      isOpenArchiveCDPopup: false,
      isOpenDatePopup: false,
      objectiveId: null,
    };
  }

  public componentWillMount() {
    this.props.getSelectedCareerDay(this.props.match.params.careerDayId);
  }

  private togglePopupState(name: any) {
    const propName = name as stateKeys;

    this.setState({ [propName as any]: !this.state[propName] });
  }

  private handleClickOnDeleteButton(e: React.MouseEvent<SVGSVGElement>, objectiveId: number) {
    e.preventDefault();

    this.setState({ objectiveId });
    this.togglePopupState('isOpenDeletePopup');
  }

  private handleDeleteObjective() {
    this.props.deleteObjective(this.state.objectiveId);
    this.togglePopupState('isOpenDeletePopup');
  }

  private handleAddObjective(objective: IObjectiveById) {
    const objectiveByCareerDayId = {
      ...objective,
      CareerDayId: this.props.match.params.careerDayId,
      EmployeeExternalId: Number(this.props.selectedCareerDay.EmployeeExternalId),
      UnitManagerExternalId: this.props.user.id,
    };

    this.props.addObjective(objectiveByCareerDayId);
  }

  private handleSaveObjective(updatedObjective: IUpdateObjective) {
    this.props.updateObjective(updatedObjective);
  }

  private handleUpdateDatetime(datetime: IUpdateInterviewDate) {
    const interviewDate = {
      ...datetime,
      id: this.props.match.params.careerDayId,
      EmployeeExternalId: Number(this.props.selectedCareerDay.EmployeeExternalId),
      UnitManagerExternalId: Number(this.props.user.id),
    };

    this.props.updateInterviewDate(interviewDate);
  }

  private renderObjectives() {
    return this.props.selectedCareerDay.Objectives.map(item => (
      <Objective
        key={item.id}
        objective={item}
        handleSaveObjective={(objective: IUpdateObjective) => this.handleSaveObjective(objective)}
        handleDeleteObjective={(
          e: React.MouseEvent<SVGSVGElement>,
          objectiveId: number,
        ) => this.handleClickOnDeleteButton(e, objectiveId)}
      />
    ));
  }

  private isArchived() {
    if (this.props.selectedCareerDay) {
      return this.props.selectedCareerDay.Archived;
    }

    return true;
  }

  private handleArchiveCareerDay() {
    const dayInfo = {
      id: this.props.selectedCareerDay.id,
      UnitManagerExternalId: this.props.user.id,
    };

    this.props.archiveCareerDay(dayInfo);
    this.togglePopupState('isOpenArchiveCDPopup');
  }

  private isActiveArchiveButton() {
    if (this.props.selectedCareerDay) {
      return moment(this.props.selectedCareerDay.InterviewDate) < moment()
        ? this.props.selectedCareerDay.Archived
        : true;
    }

    return true;
  }

  private archiveButtonText() {
    if (this.props.selectedCareerDay &&
      this.props.selectedCareerDay.Archived) {
      return 'Archived';
    }

    return 'Archive';
  }

  private getArchiveButtonTitle() {
    if (this.props.selectedCareerDay &&
      moment(this.props.selectedCareerDay.InterviewDate) > moment()) {
      return 'Can be archived only after interview date of CD.';
    }

    return 'The career day archived.';
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
          <Grid item xs={5} lg={4} xl={3}>
            <Grid container justify="flex-end" className={classes.navigation} spacing={8}>
              <Grid item>
                <ControlledTooltips
                  title={this.getArchiveButtonTitle()}
                  isDisabled={this.isActiveArchiveButton()}
                  tooltip={
                    <Button
                      disabled={this.isActiveArchiveButton()}
                      raised
                      color="primary"
                      onClick={() => this.togglePopupState('isOpenArchiveCDPopup')}
                    >
                      {this.archiveButtonText()}
                    </Button>
                  }
                />
              </Grid>
              <Grid item>
                <ControlledTooltips
                  title="You can't change date of archived day"
                  isDisabled={this.isArchived()}
                  tooltip={
                    <Button
                      disabled={this.isArchived()}
                      raised
                      color="primary"
                      onClick={() => this.togglePopupState('isOpenDatePopup')}
                    >
                      Change interview date
                    </Button>
                  }
                />
              </Grid>
            </Grid>

            <Grid container justify="center">
              <div className={classes.datetime}>
                {this.props.selectedCareerDay &&
                this.props.selectedCareerDay.CreatedAt &&
                <DatetimeList selectedCareerDay={this.props.selectedCareerDay} />}
              </div>
            </Grid>

            <Grid container justify="flex-end" className={classes.navigation} spacing={8}>
              <Grid item>
                <ControlledTooltips
                  title={'The career day archived.'}
                  isDisabled={this.isArchived()}
                  tooltip={
                    <Button
                      raised
                      disabled={this.isArchived()}
                      color="primary"
                      onClick={() => this.togglePopupState('isOpenAddPopup')}
                    >
                      Add objective
                    </Button>
                  }
                />
              </Grid>
            </Grid>

            <Grid container justify="center">
              <div className={classes.root}>
                {(
                  this.props.selectedCareerDay &&
                  this.props.selectedCareerDay.Objectives) &&
                this.renderObjectives()}
              </div>
            </Grid>
          </Grid>
        </Grid>

        {this.state.isOpenDatePopup && (
          <EditDatetimePopup
            handleClosePopup={() => this.togglePopupState('isOpenDatePopup')}
            handleUpdateDatetime={(datetime: IUpdateInterviewDate) => this.handleUpdateDatetime(datetime)}
            open={this.state.isOpenDatePopup}
            interviewDate={this.props.selectedCareerDay.InterviewDate}
          />
        )}
        {this.state.isOpenAddPopup && (
          <AddObjectivePopup
            handleClosePopup={() => this.togglePopupState('isOpenAddPopup')}
            handleAddObjective={(objective: IObjectiveById) => this.handleAddObjective(objective)}
            open={this.state.isOpenAddPopup}
          />
        )}
        {this.state.isOpenDeletePopup && (
          <ConfirmationPopup
            handleClosePopup={() => this.togglePopupState('isOpenDeletePopup')}
            handleConfirm={() => this.handleDeleteObjective()}
            open={this.state.isOpenDeletePopup}
            title={'Delete this objective?'}
            description={'After deleting, you cann\'t come back objective!'}
          />
        )}
        {this.state.isOpenArchiveCDPopup && (
          <ConfirmationPopup
            handleClosePopup={() => this.togglePopupState('isOpenArchiveCDPopup')}
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
