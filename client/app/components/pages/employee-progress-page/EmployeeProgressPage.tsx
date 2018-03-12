import * as React from 'react';
import { Link, match } from 'react-router-dom';
import { Location } from 'history';
import * as moment from 'moment';
import { Theme, withStyles } from 'material-ui/styles';
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Delete from 'material-ui-icons/Delete';
import Button from 'material-ui/Button';
import ControlledTooltips from 'components/common/controlled-tooltips';
import Header from 'components/common/header';
import {
  GetCareerDaysOfEmployee,
  GetSelectedEmployee,
  AddCareerDay,
  DeleteCareerDay,
} from 'redux/modules/employees/actions';
import {
  ICareerDayOfEmployee,
  IEmployee,
} from 'redux/modules/employees/reducer';
import AddCareerDayPopup from './popups/AddCareerDayPopup';
import ConfirmationPopup from 'components/common/popups/confirmation-popup';
import IconStatus from 'components/common/icon-status/icon-status-career-day';
import backgroundColorHelper from 'components/helper/backgroundColorHelper';
import Typography from 'material-ui/Typography';
import { IUser } from 'redux/modules/auth/reducer';

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: 20,
  },
  navigation: {
    marginTop: 20,
  },
  options: {
    margin: 10,
  },
  disableLinkStyle: {
    textDecoration: 'none',
    color: 'black',
    outline: 'none',
  },
});

interface IStylesProps {
  root: string;
  navigation: string;
  options: string;
  disableLinkStyle: string;
  button: string;
}

interface IMatchParams {
  userId: number;
}

interface IProps {
  classes: IStylesProps;
  tooltip: JSX.Element;
  getCareerDayOfEmployee: GetCareerDaysOfEmployee;
  getSelectedEmployee: GetSelectedEmployee;
  careerDays: ICareerDayOfEmployee[];
  addCareerDay: AddCareerDay;
  deleteCareerDay: DeleteCareerDay;
  match: match<IMatchParams>;
  location: Location;
  user: IUser;
  selectedEmployee: IEmployee;
}

interface IState {
  isOpenDeletePopup: boolean;
  isOpenAddPopup: boolean;
  deleteCareerDayId: number;
}

class EmployeeProgressPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isOpenAddPopup: false,
      isOpenDeletePopup: false,
      deleteCareerDayId: null,
    };
  }

  public componentWillMount() {
    this.props.getSelectedEmployee(this.props.location.state.employee);
    this.props.getCareerDayOfEmployee(this.props.location.state.employee);
  }

  private toggleAddPopupState() {
    this.setState({ isOpenAddPopup: !this.state.isOpenAddPopup });
  }

  private toggleDeletePopupState() {
    this.setState({ isOpenDeletePopup: !this.state.isOpenDeletePopup });
  }

  private handleClickOnDeleteButton(
    event: React.MouseEvent<SVGSVGElement>,
    deleteCareerDayId: number,
  ) {
    event.preventDefault();

    this.setState({ deleteCareerDayId });
    this.toggleDeletePopupState();
  }

  private handleAddCareerDay(date: Date) {
    this.props.addCareerDay({
      UnitManagerExternalId: this.props.user.id,
      EmployeeExternalId: this.props.selectedEmployee.id,
      InterviewDate: date,
    });
    this.toggleAddPopupState();
  }

  private handleDeleteCareerDay() {
    this.props.deleteCareerDay(this.state.deleteCareerDayId);
    this.toggleDeletePopupState();
  }

  private isActiveButton() {
    if (this.props.careerDays) {
      return this.props.careerDays.some(item => item.Archived === false);
    } else {
      return false;
    }
  }

  private getCurrentDate(item: ICareerDayOfEmployee) {
    const format = 'DD.MM.YYYY hh:mm A';

    if (item.Archived) {
      return `${moment(item.CreatedAt).format(format)} - ${moment(
        item.UpdatedAt,
      ).format(format)}`;
    }
    return `${moment(item.CreatedAt).format(format)} - ${moment(
      item.InterviewDate,
    ).format(format)}`;
  }

  private renderHistoryOfProgress(classes: IStylesProps) {
    if (this.props.careerDays.length === 0) {
      return (
        <Typography align="center">
          This employee doesn't have career days.
        </Typography>
      );
    } else {
      return this.props.careerDays.map(item => (
        <Link
          key={item.id}
          to={{
            pathname: `/employees/${
              this.props.match.params.userId
            }/career-day/${item.id}`,
          }}
          className={classes.disableLinkStyle}
        >
          <ListItem  id={item.id.toString()} key={item.id} dense button>
            <IconStatus isArchived={item.Archived} />
            <ListItemText primary={this.getCurrentDate(item)} />
            <ListItemSecondaryAction>
              <Delete
                className={classes.options}
                onClick={e => this.handleClickOnDeleteButton(e, item.id)}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </Link>
      ));
    }
  }

  public render() {
    const {classes} = this.props;

    backgroundColorHelper();

    return (
      <div>
        <Grid container justify="center" spacing={0}>
          {this.props.selectedEmployee && (
            <Header
              title={`${this.props.selectedEmployee.FirstName} ${
                this.props.selectedEmployee.LastName
              }'s progress days`}
            />
          )}
          <Grid item xs={5} lg={4} xl={3}>
            <Grid container justify="flex-end" spacing={8} className={classes.navigation}>
              <Grid item>
                <ControlledTooltips
                  title="Employee already has active career day"
                  isDisabled={this.isActiveButton()}
                  tooltip={
                    <Button
                      disabled={this.isActiveButton()}
                      raised
                      color="primary"
                      onClick={() => this.toggleAddPopupState()}
                    >
                      Add career day
                    </Button>
                  }
                />
              </Grid>
            </Grid>

            <Grid container justify="center" spacing={0}>
              <Grid item className={classes.root}>
                <List>
                  {this.props.careerDays &&
                    this.renderHistoryOfProgress(classes)}
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {this.state.isOpenAddPopup && (
          <AddCareerDayPopup
            handleClosePopup={() => this.toggleAddPopupState()}
            handleAddCareerDay={(date: Date) => this.handleAddCareerDay(date)}
            open={this.state.isOpenAddPopup}
          />
        )}
        {this.state.isOpenDeletePopup && (
          <ConfirmationPopup
            handleClosePopup={() => this.toggleDeletePopupState()}
            handleConfirm={() => this.handleDeleteCareerDay()}
            open={this.state.isOpenDeletePopup}
            title={'Remove this career day?'}
            description={'Also, along with the career day, the objectives that belong to this will be removed!'}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(EmployeeProgressPage);
