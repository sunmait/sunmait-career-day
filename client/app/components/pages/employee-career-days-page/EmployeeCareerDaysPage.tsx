import 'assets/styles/backgrounds/greyBackground.less';

import * as React from 'react';
import * as moment from 'moment';
import {Theme, withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Delete from 'material-ui-icons/Delete';
import Edit from 'material-ui-icons/Edit';
import TimeLine from 'material-ui-icons/Timeline';
import Archive from 'material-ui-icons/Archive';
import Button from 'material-ui/Button';
import ControlledTooltips from 'components/common/ControlledTooltips ';
import Header from 'components/common/Header';
import * as employeesAction from 'redux/modules/employees/employeesAction';
import {ICareerDaysOfEmployee} from 'redux/modules/employees/employeesReducer';
import AddNewDaysPage from 'components/pages/career-days-page/CareerDaysPopup';

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

interface IPropsWithStyles {
  root: string;
  profileHeader: string;
  options: string;
}

interface IEmployeeProfileProps {
  classes: IPropsWithStyles;
  tooltip: object;
  fullName: string;
  getCareerDayOfEmployee: employeesAction.GetCareerDaysOfEmployee;
  careerDays: ICareerDaysOfEmployee[];
  handleClosePopup: object;
}

interface IEmployeeProfileState {
  isOpen: boolean;
}

class EmployeeProfilePage extends React.Component<IEmployeeProfileProps, IEmployeeProfileState> {
  constructor(props: IEmployeeProfileProps) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  public handleAddCareerDayClick = () => {
    this.setState({isOpen: !this.state.isOpen});
  }

  public componentWillMount() {
    this.props.getCareerDayOfEmployee();
  }

  public getCurrentDate = (item: ICareerDaysOfEmployee) => {
    const format = 'DD.MM.YYYY hh:mm A';

    if (item.Archived) {
      return `${moment(item.CreatedAt).format(format)} - ${moment(item.UpdatedAt).format(format)}`;
    }
    return `${moment(item.CreatedAt).format(format)} - ${moment(item.InterviewDate).format(format)}`;
  }

  public renderHistoryOfCareerDays = () => {
    const careerDays: ICareerDaysOfEmployee[] = this.props.careerDays;

    return (
      careerDays.map(item => (
        <ListItem key={item.id} dense button>
          {item.Archived ?
            <ControlledTooltips
              title="Archived"
              tooltip={<Archive />}
            />
            :
            <ControlledTooltips
              title="In progress"
              tooltip={<TimeLine />}
            />
          }

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
              <Button raised color="primary" onClick={this.handleAddCareerDayClick}>Add career day</Button>
              {this.state.isOpen &&
              <AddNewDaysPage handleClosePopup={this.handleAddCareerDayClick} open={this.state.isOpen} />
              }
            </Grid>

            <Grid item>
              <div className={classes.root}>
                <List>
                  {this.props.careerDays.length > 0 && this.renderHistoryOfCareerDays()}
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
