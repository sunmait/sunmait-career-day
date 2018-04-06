import * as React from 'react';
import { Link, match } from 'react-router-dom';
import { Location } from 'history';
import { Theme, withStyles } from 'material-ui/styles';
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Delete from 'material-ui-icons/Delete';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import ControlledTooltips from 'components/common/controlled-tooltips';
import Header from 'components/common/header';
import {
  GetCareerDaysOfEmployee,
  AddCareerDay,
  DeleteCareerDay,
  GetSelectedEmployee,
} from 'redux/modules/employees/actions';
import { ICareerDayOfEmployee, IEmployee } from 'redux/modules/employees/reducer';
import { toStandardFormat } from '../../helper/dateTimeHelper';
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
    marginBottom: 20,
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
    display: 'inline-table',
    height: 48,
    width: '100%',
  },
  linkTextStyle: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
});

interface IStylesProps {
  root: string;
  navigation: string;
  options: string;
  disableLinkStyle: string;
  linkTextStyle: string;
  button: string;
}

interface IMatchParams {
  userId: number;
}

interface IProps {
  classes: IStylesProps;
  tooltip: JSX.Element;
  getCareerDayOfEmployee: GetCareerDaysOfEmployee;
  careerDays: ICareerDayOfEmployee[];
  addCareerDay: AddCareerDay;
  deleteCareerDay: DeleteCareerDay;
  match: match<IMatchParams>;
  location: Location;
  user: IUser;
  selectedEmployee: IEmployee;
  getSelectedEmployee: GetSelectedEmployee;
}

interface IState {
  isOpenDeletePopup: boolean;
  isOpenAddPopup: boolean;
  deleteCareerDayId: number;
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

  private togglePopupState(name: any) {
    const propName = name as stateKeys;

    this.setState({ [propName as any]: !this.state[propName] });
  }

  private handleClickOnDeleteButton(
    event: React.MouseEvent<HTMLElement>,
    deleteCareerDayId: number,
  ) {
    event.preventDefault();

    this.setState({ deleteCareerDayId });
    this.togglePopupState('isOpenDeletePopup');
  }

  private handleAddCareerDay(date: Date) {
    this.props.addCareerDay({
      UnitManagerId: this.props.user.id,
      EmployeeId: this.props.selectedEmployee.id,
      InterviewDate: date,
    });
    this.togglePopupState('isOpenAddPopup');
  }

  private handleDeleteCareerDay() {
    this.props.deleteCareerDay(this.state.deleteCareerDayId);
    this.togglePopupState('isOpenDeletePopup');
  }

  private isActiveButton() {
    if (this.props.careerDays) {
      return this.props.careerDays.some(item => item.Archived === false);
    } else {
      return false;
    }
  }

  private getCurrentDate(item: ICareerDayOfEmployee) {
    if (item.Archived) {
      return `${toStandardFormat(item.CreatedAt)} - ${toStandardFormat(item.UpdatedAt)}`;
    }
    return `${toStandardFormat(item.CreatedAt)} - ${toStandardFormat(item.InterviewDate)}`;
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
          <ListItem  id={item.id.toString()} key={item.id} dense button>
            <IconStatus isArchived={item.Archived} />
            <Link
              to={{
                pathname: `/employees/${
                  this.props.match.params.userId
                }/career-day/${item.id}`,
              }}
              className={classes.disableLinkStyle}
            >
              <ListItemText primary={this.getCurrentDate(item)} className={classes.linkTextStyle}/>
            </Link>
            <ListItemSecondaryAction>
              <IconButton
                disabled={!item.Archived}
                onClick={e => this.handleClickOnDeleteButton(e, item.id)}
              >
                <Delete
                  className={classes.options}
                  name="delete-icon"
                />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
      ));
    }
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
                    {this.props.careerDays &&
                      this.renderHistoryOfProgress(classes)}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {this.state.isOpenAddPopup && (
          <AddCareerDayPopup
            handleClosePopup={() => this.togglePopupState('isOpenAddPopup')}
            handleAddCareerDay={(date: Date) => this.handleAddCareerDay(date)}
            open={this.state.isOpenAddPopup}
          />
        )}
        {this.state.isOpenDeletePopup && (
          <ConfirmationPopup
            handleClosePopup={() => this.togglePopupState('isOpenDeletePopup')}
            handleConfirm={() => this.handleDeleteCareerDay()}
            open={this.state.isOpenDeletePopup}
            title={'Remove this career day?'}
            description={'Also, along with the career day, the objectives that belong to this will be removed!'}
            confirmTitle={'Delete the day'}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(EmployeeProgressPage);
