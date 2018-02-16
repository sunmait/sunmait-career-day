import 'assets/styles/backgrounds/defaultBackground.less';

import * as React from 'react';

import {match, Link} from 'react-router-dom';
import * as moment from 'moment';
import {Theme, withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Delete from 'material-ui-icons/Delete';
import Edit from 'material-ui-icons/Edit';
import Button from 'material-ui/Button';
import ControlledTooltips from 'components/common/ControlledTooltips ';
import Header from 'components/common/Header';
import * as employeesAction from 'redux/modules/employees/employeesAction';
import {ICareerDaysOfEmployee, IUserID, IEmployees} from 'redux/modules/employees/employeesReducer';
import CareerDayPopup from 'components/pages/employee-progress-page/caree-day-popup/CareerDayPopup';
import IconStatus from 'components/common/IconStatus';

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 750,
    backgroundColor: theme.palette.background.paper,
    marginTop: 20,
  },
  navigation: {
    marginTop: 20,
  },
  options: {
    margin: 10,
  },
});

interface IStylesProps {
  root: string;
  navigation: string;
  options: string;
}

interface IMatchParams {
  userId: string;
}

interface IEmployeeProgressProps {
  classes: IStylesProps;
  tooltip: JSX.Element;
  fullName: string;
  getCareerDayOfEmployee: employeesAction.GetCareerDaysOfEmployee;
  careerDays: ICareerDaysOfEmployee[];
  employee: IEmployees[];
  employeeFullName: IUserID;
  handleClosePopup: () => void;
  match: match<IMatchParams>;
}

interface IEmployeeProgressState {
  isOpen: boolean;
}

class EmployeeProgressPage extends React.Component<IEmployeeProgressProps, IEmployeeProgressState> {
  constructor(props: IEmployeeProgressProps) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  public componentWillMount() {
    this.props.getCareerDayOfEmployee(this.props.match.params.userId);
  }

  public togglePopupState = () => {
    this.setState({isOpen: !this.state.isOpen});
  }

  public isActiveButton = () => {
    if (this.props.careerDays) {
      return this.props.careerDays.some(item => item.Archived === false);
    } else {
      return false;
    }
  }

  public getCurrentDate = (item: ICareerDaysOfEmployee) => {
    const format = 'DD.MM.YYYY hh:mm A';

    if (item.Archived) {
      return `${moment(item.CreatedAt).format(format)} - ${moment(item.UpdatedAt).format(format)}`;
    }
    return `${moment(item.CreatedAt).format(format)} - ${moment(item.InterviewDate).format(format)}`;
  }

  public renderHistoryOfProgress = () => {
    return (
      this.props.careerDays.map(item => (
        <Link key={item.id} to={`/employees/${this.props.match.params.userId}/career-day/${item.id}`}>
          <ListItem key={item.id} dense button>
            {IconStatus(item.Archived)}
            <ListItemText primary={this.getCurrentDate(item)} />
            <ListItemSecondaryAction>
              <Edit className={this.props.classes.options} />
              <Delete className={this.props.classes.options} />
            </ListItemSecondaryAction>
          </ListItem>
        </Link>
      ))
    );
  }

  public render() {
    const {classes} = this.props;

    return (
      <div className="default-background">
        <Grid container justify="center">
          <Grid item xs={6}>
            <Header title="Employee's career days" />
            <Grid container justify="space-between" className={classes.navigation}>
              <Grid item xs={7}>
                <Typography noWrap type="headline">{this.props.employeeFullName}</Typography>
              </Grid>

              <Grid item xs={5}>
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

              {this.state.isOpen &&
              <CareerDayPopup handleClosePopup={this.togglePopupState} open={this.state.isOpen} />
              }
            </Grid>

            <Grid item>
              <div className={classes.root}>
                <List>
                  {this.props.careerDays && this.renderHistoryOfProgress()}
                </List>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(EmployeeProgressPage);
