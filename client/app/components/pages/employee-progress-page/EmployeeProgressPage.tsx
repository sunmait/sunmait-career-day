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
import * as employeesAction from 'redux/modules/employees/action';
import {
  ICareerDayOfEmployee,
  IEmployee,
} from 'redux/modules/employees/reducer';
import CareerDayPopup from './caree-day-popup';
import IconStatus from 'components/common/icon-status';
import backgroundColorHelper from 'components/helper/backgroundColorHelper';
import Typography from 'material-ui/Typography';
import { IUser } from 'redux/modules/auth/reducer';

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 800,
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
  },
});

interface IStylesProps {
  root: string;
  navigation: string;
  options: string;
  disableLinkStyle: string;
}

interface IMatchParams {
  userId: number;
}

interface IProps {
  classes: IStylesProps;
  tooltip: JSX.Element;
  getCareerDayOfEmployee: employeesAction.GetCareerDaysOfEmployee;
  getSelectedEmployee: employeesAction.GetSelectedEmployee;
  careerDays: ICareerDayOfEmployee[];
  addCareerDay: employeesAction.AddCareerDay;
  match: match<IMatchParams>;
  location: Location;
  user: IUser;
  selectedEmployee: IEmployee;
}

interface IState {
  isOpen: boolean;
}

class EmployeeProgressPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  public componentWillMount() {
    this.props.getSelectedEmployee(this.props.location.state.employee);
    this.props.getCareerDayOfEmployee(this.props.location.state.employee);
  }

  public togglePopupState = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  public handleAddCareerDay = (date: Date) => {
    this.props.addCareerDay({
      UnitManagerExternalId: this.props.user.id,
      EmployeeExternalId: this.props.selectedEmployee.id,
      InterviewDate: date,
    });
    this.togglePopupState();
  }

  public isActiveButton = () => {
    if (this.props.careerDays) {
      return this.props.careerDays.some(item => item.Archived === false);
    } else {
      return false;
    }
  }

  public getCurrentDate = (item: ICareerDayOfEmployee) => {
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

  public renderHistoryOfProgress = (classes: IStylesProps) => {
    if (this.props.careerDays.length === 0) {
      return (
        <Typography align="center">
          This employee does not have career days.
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
          <ListItem key={item.id} dense button>
            <IconStatus isArchived={item.Archived} />
            <ListItemText primary={this.getCurrentDate(item)} />
            <ListItemSecondaryAction>
              <Delete className={classes.options} />
            </ListItemSecondaryAction>
          </ListItem>
        </Link>
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
          <Grid item xs={5}>
            <Grid container justify="flex-end" className={classes.navigation}>
              <Grid item>
                <ControlledTooltips
                  title="Employee already has active career day"
                  isDisabled={this.isActiveButton()}
                  tooltip={
                    <Button
                      disabled={this.isActiveButton()}
                      raised
                      color="primary"
                      onClick={this.togglePopupState}
                    >
                      Add career day
                    </Button>
                  }
                />
              </Grid>
              {this.state.isOpen && (
                <CareerDayPopup
                  handleClosePopup={this.togglePopupState}
                  handleAddCareerDay={this.handleAddCareerDay}
                  open={this.state.isOpen}
                />
              )}
            </Grid>

            <Grid container justify="center">
              <Grid item className={classes.root}>
                <List>
                  {this.props.careerDays &&
                    this.renderHistoryOfProgress(classes)}
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(EmployeeProgressPage);
