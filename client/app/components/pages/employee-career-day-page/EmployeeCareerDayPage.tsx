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
import {
  GetSelectedCareerDay,
  AddObjective,
  UpdateObjective,
  DeleteObjective,
  ArchiveCareerDay,
} from 'redux/modules/employees/actions';
import backgroundColorHelper from 'components/helper/backgroundColorHelper';
import AddObjectivePopup from './add-objective-popup';
import Objective from './objective';
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
  deleteObjective: DeleteObjective;
  match: match<IMatchParams>;
  updateObjective: UpdateObjective;
  archiveCareerDay: ArchiveCareerDay;
}

interface IState {
  isOpenAddPopup: boolean;
  isOpenDeletePopup: boolean;
  isOpenArchiveCDPopup: boolean;
  objectiveId: number;
}

class EmployeeCareerDayPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isOpenAddPopup: false,
      isOpenDeletePopup: false,
      isOpenArchiveCDPopup: false,
      objectiveId: null,
    };
  }

  public componentWillMount() {
    this.props.getSelectedCareerDay(this.props.match.params.careerDayId);
  }

  private toggleAddPopupState() {
    this.setState({ isOpenAddPopup: !this.state.isOpenAddPopup });
  }

  private toggleDeletePopupState() {
    this.setState({ isOpenDeletePopup: !this.state.isOpenDeletePopup });
  }

  private toggleArchiveCDPopupState() {
    this.setState({ isOpenArchiveCDPopup: !this.state.isOpenArchiveCDPopup });
  }

  private handleClickOnDeleteButton(e: React.MouseEvent<SVGSVGElement>, objectiveId: number) {
    e.preventDefault();

    this.setState({ objectiveId });
    this.toggleDeletePopupState();
  }

  private handleDeleteObjective() {
    this.props.deleteObjective(this.state.objectiveId);
    this.toggleDeletePopupState();
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
        handleDeleteObjective={(
          e: React.MouseEvent<SVGSVGElement>,
          objectiveId: number,
        ) => this.handleClickOnDeleteButton(e, objectiveId)}
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
                          onClick={() => this.toggleAddPopupState()}
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
                          {this.archiveButtonText()}
                        </Button>
                      }
                    />
                  </Grid>
                </Grid>
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

        {this.state.isOpenAddPopup && (
          <AddObjectivePopup
            handleClosePopup={() => this.toggleAddPopupState()}
            handleAddObjective={(objective: IObjectiveById) => this.handleAddObjective(objective)}
            open={this.state.isOpenAddPopup}
          />
        )}
        {this.state.isOpenDeletePopup && (
          <ConfirmationPopup
            handleClosePopup={() => this.toggleDeletePopupState()}
            handleConfirm={() => this.handleDeleteObjective()}
            open={this.state.isOpenDeletePopup}
            title={'Delete this objective?'}
            description={'After deleting, you cann\'t come back objective!'}
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
