import 'assets/styles/backgrounds/greyBackground.less';

import * as React from 'react';
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
import {ICareerDaysOfEmployee} from 'redux/modules/employees/employeesReducer';
import CareerDayPopup from 'components/pages/employee-career-days-page/caree-day-popup/CareerDayPopup';
import IconStatus from 'components/common/IconStatus';

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 730,
    backgroundColor: theme.palette.background.paper,
    marginTop: 20,
  },
  profileHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 20,
  } as React.CSSProperties,
  options: {
    margin: 10,
  },
});

interface IStylesProps {
  root: string;
  profileHeader: string;
  options: string;
}

interface IEmployeeCareerDaysProps {
  classes: IStylesProps;
  tooltip: JSX.Element;
  fullName: string;
  getCareerDayOfEmployee: employeesAction.GetCareerDaysOfEmployee;
  careerDays: ICareerDaysOfEmployee[];
  handleClosePopup: () => void;
}

interface IEmployeeCareerDaysState {
  isOpen: boolean;
}

class EmployeeProfilePage extends React.Component<IEmployeeCareerDaysProps, IEmployeeCareerDaysState> {
  constructor(props: IEmployeeCareerDaysProps) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  public componentWillMount() {
    this.props.getCareerDayOfEmployee();
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

  public renderHistoryOfCareerDays = () => {
    return (
      this.props.careerDays.map(item => (
        <ListItem key={item.id} dense button>
          {IconStatus(item.Archived)}
          <ListItemText primary={this.getCurrentDate(item)} />
          <ListItemSecondaryAction>
            <Edit className={this.props.classes.options} />
            <Delete className={this.props.classes.options} />
          </ListItemSecondaryAction>
        </ListItem>
      ))
    );
  }

  public render() {
    const {classes} = this.props;

    return (
      <div className="grey-background">
        <Grid container justify="center">
          <Grid item xs={6}>
            {Header('Career days of employee')}
            <Grid item className={classes.profileHeader}>
              <Grid item xs={7}>
                <Typography noWrap type="headline">Full NameFull</Typography>
              </Grid>

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

              {this.state.isOpen &&
              <CareerDayPopup handleClosePopup={this.togglePopupState} open={this.state.isOpen} />
              }
            </Grid>

            <Grid item>
              <div className={classes.root}>
                <List>
                  {this.props.careerDays && this.renderHistoryOfCareerDays()}
                </List>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(EmployeeProfilePage);
