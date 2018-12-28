import * as React from 'react';
import { Link, match } from 'react-router-dom';
import { Location } from 'history';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Delete from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ControlledTooltips from '../../common/controlled-tooltips';
import Header from '../../common/header';
import { ICareerDayOfEmployee } from '../../../redux/modules/employees/reducer';
import { toStandardFormat } from '../../helper/dateTimeHelper';
import AddCareerDayPopup from './popups/AddCareerDayPopup';
import ConfirmationPopup from '../../common/popups/confirmation-popup';
import IconStatus from '../../common/icon-status/icon-status-career-day';
import backgroundColorHelper from '../../helper/backgroundColorHelper';
import Typography from '@material-ui/core/Typography';
import { ConnectProps } from './ConnectContainer';
import { StylesProps } from './StylesContainer';

interface IMatchParams {
  userId: string;
}

interface IProps extends ConnectProps, StylesProps {
  match: match<IMatchParams>;
  location: Location;
}

interface IState {
  isOpenDeletePopup: boolean;
  isOpenAddPopup: boolean;
  deleteCareerDayId: number | null;
}

type stateKeys = keyof IState;

class EmployeeProgressPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isOpenAddPopup: false,
      isOpenDeletePopup: false,
      deleteCareerDayId: null,
    };
  }

  public componentDidMount() {
    this.props.getSelectedEmployee(this.props.location.state.employee.id);
    this.props.getCareerDayOfEmployee(this.props.location.state.employee.id);
  }

  private togglePopupState = (name: any) => {
    const propName = name as stateKeys;
    const updateState = { [propName as any]: !this.state[propName] } as Pick<
      IState,
      stateKeys
    >;

    this.setState(updateState);
  }

  private handleClickOnDeleteButton = (
    event: React.MouseEvent<HTMLElement>,
    deleteCareerDayId: number,
  ) => {
    event.preventDefault();

    this.setState({ deleteCareerDayId });
    this.togglePopupState('isOpenDeletePopup');
  }

  private handleAddCareerDay = (date: Date) => {
    const { user, selectedEmployee, addCareerDay } = this.props;
    if (!user || !selectedEmployee) {
      throw new Error('Cannot archive career day without manager or employee');
    }
    addCareerDay({
      UnitManagerId: user.profile.id,
      EmployeeId: selectedEmployee.id,
      InterviewDate: date,
    });
    this.togglePopupState('isOpenAddPopup');
  }

  private handleDeleteCareerDay = () => {
    const { deleteCareerDayId } = this.state;
    if (deleteCareerDayId) {
      this.props.deleteCareerDay(deleteCareerDayId);
    }
    this.togglePopupState('isOpenDeletePopup');
  }

  private isActiveButton = () => {
    if (this.props.careerDays) {
      return this.props.careerDays.some(item => item.Archived === false);
    } else {
      return false;
    }
  }

  private getCurrentDate = (item: ICareerDayOfEmployee) => {
    if (item.Archived) {
      return `${toStandardFormat(item.CreatedAt)} - ${toStandardFormat(
        item.UpdatedAt,
      )}`;
    }
    return `${toStandardFormat(item.CreatedAt)} - ${toStandardFormat(
      item.InterviewDate,
    )}`;
  }

  private renderHistoryOfProgress = () => {
    const {
      classes,
      careerDays,
      match: {
        params: { userId },
      },
    } = this.props;

    if (!careerDays || careerDays.length === 0) {
      return (
        <Typography align="center">
          This employee doesn't have career days.
        </Typography>
      );
    }
    return careerDays.map(item => (
      <ListItem id={item.id.toString()} key={item.id} dense button>
        <IconStatus isArchived={item.Archived} />
        <Link
          to={{
            pathname: `/employees/${userId}/career-day/${item.id}`,
          }}
          className={classes.disableLinkStyle}
        >
          <ListItemText
            primary={this.getCurrentDate(item)}
            className={classes.linkTextStyle}
          />
        </Link>
        <ListItemSecondaryAction>
          <IconButton
            disabled={!item.Archived}
            onClick={e => this.handleClickOnDeleteButton(e, item.id)}
          >
            <Delete className={classes.options} name="delete-icon" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
  }

  public render() {
    const { classes } = this.props;

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
          <Grid item xs={11} sm={8} md={5} lg={4} xl={3}>
            <Grid
              container
              justify="flex-end"
              spacing={8}
              className={classes.navigation}
            >
              <Grid item>
                <ControlledTooltips
                  title="Employee already has active career day"
                  isDisabled={this.isActiveButton()}
                  tooltip={
                    <Button
                      disabled={this.isActiveButton()}
                      variant="contained"
                      color="primary"
                      name="add-career-day"
                      onClick={() => this.togglePopupState('isOpenAddPopup')}
                    >
                      Add career day
                    </Button>
                  }
                />
              </Grid>
            </Grid>

            <Grid container justify="center" spacing={0}>
              <Grid item className={classes.root}>
                <Paper elevation={1}>
                  <List>
                    {this.props.careerDays && this.renderHistoryOfProgress()}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {this.state.isOpenAddPopup && (
          <AddCareerDayPopup
            handleClosePopup={() => this.togglePopupState('isOpenAddPopup')}
            handleAddCareerDay={this.handleAddCareerDay}
            open={this.state.isOpenAddPopup}
          />
        )}
        {this.state.isOpenDeletePopup && (
          <ConfirmationPopup
            handleClosePopup={() => this.togglePopupState('isOpenDeletePopup')}
            handleConfirm={this.handleDeleteCareerDay}
            open={this.state.isOpenDeletePopup}
            title={'Remove this career day?'}
            description={
              'Also, along with the career day, the objectives that belong to this will be removed!'
            }
            confirmTitle={'Delete the day'}
          />
        )}
      </div>
    );
  }
}

export default EmployeeProgressPage;
