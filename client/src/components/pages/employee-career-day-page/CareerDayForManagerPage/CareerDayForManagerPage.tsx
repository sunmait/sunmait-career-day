import * as React from 'react';
import moment from 'moment';
import Header from '../../../common/header/index';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {
  IObjectiveById,
  IUpdateObjectiveManager,
  IUpdateInterviewDate,
  IUpdateObjectiveEmployee,
} from '../../../../redux/modules/employees/reducer';
import backgroundColorHelper from '../../../helper/backgroundColorHelper';
import AddObjectivePopup from '../popups/add-objective-popup/index';
import Objective from '../objective/index';
import ConfirmationPopup from '../../../common/popups/confirmation-popup/index';
import ControlledTooltips from '../../../common/controlled-tooltips/index';
import EditDatetimePopup from '../popups/update-date-popup/index';
import DatetimeList from '../datetime-list/index';
import { ConnectProps } from './ConnectContainer';
import { StylesProps } from './StylesContainer';

interface IProps extends ConnectProps, StylesProps {
  careerDayId: number;
  userId: number;
}

interface IState {
  isOpenAddPopup: boolean;
  isOpenDeletePopup: boolean;
  isOpenArchiveCDPopup: boolean;
  isOpenDatePopup: boolean;
  objectiveId: number | null;
}

type stateKeys = keyof IState;

class CareerDayForManagerPage extends React.Component<IProps, IState> {
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

  public componentDidMount() {
    this.props.getSelectedEmployee(this.props.userId);
    this.props.getSelectedCareerDay(this.props.careerDayId);
  }

  private togglePopupState(name: any) {
    const propName = name as stateKeys;

    this.setState({ [propName as any]: !this.state[propName] } as Pick<
      IState,
      stateKeys
    >);
  }

  private handleClickOnDeleteButton(
    e: React.MouseEvent<HTMLElement>,
    objectiveId: number,
  ) {
    e.preventDefault();

    this.setState({ objectiveId });
    this.togglePopupState('isOpenDeletePopup');
  }

  private handleDeleteObjective() {
    if (this.state.objectiveId) {
      this.props.deleteObjective(this.state.objectiveId);
    }
    this.togglePopupState('isOpenDeletePopup');
  }

  private handleAddObjective(
    objective: Pick<IObjectiveById, 'Title' | 'Description'>,
  ) {
    if (!this.props.user || !this.props.selectedCareerDay) {
      throw new Error('Cannot add objective without manager or the career day');
    }
    const objectiveByCareerDayId = {
      ...objective,
      CareerDayId: this.props.careerDayId,
      EmployeeId: Number(this.props.selectedCareerDay.EmployeeId),
      UnitManagerId: this.props.user.id,
    };

    this.props.addObjective(objectiveByCareerDayId);
  }

  private handleSaveObjective(
    updatedObjective: IUpdateObjectiveManager | IUpdateObjectiveEmployee,
  ) {
    this.props.updateObjectiveManager(
      updatedObjective as IUpdateObjectiveManager,
    );
  }

  private handleUpdateDatetime(datetime: Pick<IUpdateInterviewDate, 'date'>) {
    if (!this.props.user || !this.props.selectedCareerDay) {
      throw new Error(
        'Cannot update interview date without manager or the career day',
      );
    }
    const interviewDate = {
      ...datetime,
      id: this.props.careerDayId,
      EmployeeId: Number(this.props.selectedCareerDay.EmployeeId),
      UnitManagerId: Number(this.props.user.id),
    };

    this.props.updateInterviewDate(interviewDate);
  }

  private renderObjectives() {
    const { selectedCareerDay, user } = this.props;
    if (!selectedCareerDay || !selectedCareerDay.Objectives || !user) {
      return null;
    }

    return selectedCareerDay.Objectives.map(item => (
      <Objective
        key={item.id}
        objective={item}
        userRole={user.Role}
        archived={selectedCareerDay.Archived}
        handleSaveObjective={this.handleSaveObjective}
        handleDeleteObjective={this.handleClickOnDeleteButton}
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
    if (!this.props.user || !this.props.selectedCareerDay) {
      throw new Error(
        'Cannot archive career day without manager or the career day',
      );
    }
    const dayInfo = {
      id: this.props.selectedCareerDay.id,
      UnitManagerId: this.props.user.id,
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
    if (this.props.selectedCareerDay && this.props.selectedCareerDay.Archived) {
      return 'Archived';
    }

    return 'Archive';
  }

  private getArchiveButtonTitle() {
    if (
      this.props.selectedCareerDay &&
      moment(this.props.selectedCareerDay.InterviewDate) > moment()
    ) {
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
            title={`${this.props.selectedEmployee &&
              this.props.selectedEmployee.FirstName} ${this.props
              .selectedEmployee &&
              this.props.selectedEmployee.LastName}'s career day`}
          />
          <Grid item xs={11} sm={8} md={5} lg={4} xl={3}>
            <Grid
              container
              justify="flex-end"
              className={classes.navigation}
              spacing={8}
            >
              <Grid item>
                <ControlledTooltips
                  title={this.getArchiveButtonTitle()}
                  isDisabled={this.isActiveArchiveButton()}
                  tooltip={
                    <Button
                      disabled={this.isActiveArchiveButton()}
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        this.togglePopupState('isOpenArchiveCDPopup')
                      }
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
                      variant="contained"
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
                  this.props.selectedCareerDay.CreatedAt && (
                    <DatetimeList
                      selectedCareerDay={this.props.selectedCareerDay}
                    />
                  )}
              </div>
            </Grid>

            <Grid
              container
              justify="flex-end"
              className={classes.navigation}
              spacing={8}
            >
              <Grid item>
                <ControlledTooltips
                  title={'The career day archived.'}
                  isDisabled={this.isArchived()}
                  tooltip={
                    <Button
                      variant="contained"
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
                {this.props.selectedCareerDay &&
                  this.props.selectedCareerDay.Objectives &&
                  this.renderObjectives()}
              </div>
            </Grid>
          </Grid>
        </Grid>

        {this.state.isOpenDatePopup &&
          this.props.selectedCareerDay && (
            <EditDatetimePopup
              handleClosePopup={() => this.togglePopupState('isOpenDatePopup')}
              handleUpdateDatetime={this.handleUpdateDatetime}
              open={this.state.isOpenDatePopup}
              interviewDate={this.props.selectedCareerDay.InterviewDate}
            />
          )}
        {this.state.isOpenAddPopup && (
          <AddObjectivePopup
            handleClosePopup={() => this.togglePopupState('isOpenAddPopup')}
            handleAddObjective={this.handleAddObjective}
            open={this.state.isOpenAddPopup}
          />
        )}
        {this.state.isOpenDeletePopup && (
          <ConfirmationPopup
            handleClosePopup={() => this.togglePopupState('isOpenDeletePopup')}
            handleConfirm={this.handleDeleteObjective}
            open={this.state.isOpenDeletePopup}
            title={'Delete this objective?'}
            description="After deleting, you can't come back objective!"
            confirmTitle={'Delete objective'}
          />
        )}
        {this.state.isOpenArchiveCDPopup && (
          <ConfirmationPopup
            handleClosePopup={() =>
              this.togglePopupState('isOpenArchiveCDPopup')
            }
            handleConfirm={this.handleArchiveCareerDay}
            open={this.state.isOpenArchiveCDPopup}
            title="Archive this career day?"
            description="After archiving, you can't edit a career day!"
            confirmTitle={'Archive the day'}
          />
        )}
      </div>
    );
  }
}

export default CareerDayForManagerPage;
