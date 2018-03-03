import * as React from 'react';
import { match } from 'react-router-dom';
import { Location } from 'history';
import { Theme, withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
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
import DeleteCareerDayPopup from 'components/common/popups/delete-popup';
import backgroundColorHelper from 'components/helper/backgroundColorHelper';
import { IUser } from 'redux/modules/auth/reducer';

import HistoryOfProgress from './history-of-progress/HistoryOfProgress';

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
    this.setState({isOpenAddPopup: !this.state.isOpenAddPopup});
  }

  private toggleDeletePopupState() {
    this.setState({isOpenDeletePopup: !this.state.isOpenDeletePopup});
  }

  private handleClickOnDeleteButton(event: React.MouseEvent<SVGSVGElement>, deleteCareerDayId: number) {
    event.preventDefault();

    this.setState({deleteCareerDayId});
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
                      onClick={() => this.toggleAddPopupState()}
                    >
                      Add career day
                    </Button>
                  }
                />
              </Grid>
              {this.state.isOpenAddPopup && (
                <AddCareerDayPopup
                  handleClosePopup={() => this.toggleAddPopupState()}
                  handleAddCareerDay={(date: Date) => this.handleAddCareerDay(date)}
                  open={this.state.isOpenAddPopup}
                />
              )}
              {this.state.isOpenDeletePopup && (
                <DeleteCareerDayPopup
                  handleClosePopup={() => this.toggleDeletePopupState()}
                  handleDeleteItem={() => this.handleDeleteCareerDay()}
                  open={this.state.isOpenDeletePopup}
                />
              )}
            </Grid>

            <Grid container justify="center">
              <Grid item className={classes.root}>
                <List>
                  <HistoryOfProgress 
                    handleClickOnDeleteButton={(event: React.MouseEvent<SVGSVGElement>, deleteCareerDayId: number) => this.handleClickOnDeleteButton(event, deleteCareerDayId)}
                    classes = {classes} 
                    careerDays = {this.props.careerDays} 
                    match = {this.props.match}/>
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
