import * as React from 'react';
import { match } from 'react-router-dom';
import { Theme, withStyles } from 'material-ui/styles';
import Header from 'components/common/header';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Edit from 'material-ui-icons/Edit';
import Delete from 'material-ui-icons/Delete';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import { IUser } from 'redux/modules/auth/reducer';
import {
  ICareerDayOfEmployee,
  IEmployee,
  IObjectiveById,
} from 'redux/modules/employees/reducer';
import { GetSelectedCareerDay, AddObjective, UpdateObjective } from 'redux/modules/employees/actions';
import IconStatus from 'components/common/icon-status/icon-status-objective';
import backgroundColorHelper from 'components/helper/backgroundColorHelper';
import EditObjectivePopup from './add-objective-popup';

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    marginLeft: 10,
  },
  navigation: {
    margin: 0,
    marginTop: 20,
  },
  alignIcons: {
    margin: 10,
  },
  summary: {
    display: 'flex',
    alignItems: 'center',
    flex: '1 0 0',
  } as React.CSSProperties,
});

interface IStylesProps {
  root: string;
  alignIcons: string;
  navigation: string;
  heading: string;
  summary: string;
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
  match: match<IMatchParams>;
  updateObjective: UpdateObjective;
}

interface IState {
  isOpen: boolean;
}

class EmployeeCareerDayPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  public componentWillMount() {
    this.props.getSelectedCareerDay(this.props.match.params.careerDayId);
  }

  private togglePopupState() {
    this.setState({isOpen: !this.state.isOpen});
  }

  private handleAddObjective(objective: IObjectiveById) {
    const objectiveByCareerDayId = {...objective, CareerDayId: this.props.match.params.careerDayId};

    this.props.addObjective(objectiveByCareerDayId);
  }

  private renderObjectives(classes: IStylesProps) {
    return this.props.selectedCareerDay.Objectives.map(item => (
      <ExpansionPanel key={item.id}>
        <ExpansionPanelSummary>
          <div className={classes.summary}>
            <IconStatus statusId={item.StatusId} />
            <Typography className={classes.heading}>{item.Title}</Typography>
          </div>

          <div style={{padding: 0}}>
            <Edit className={classes.alignIcons} />
            <Delete className={classes.alignIcons} />
          </div>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Typography>{item.Description}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ));
  }

  public render() {
    const {classes} = this.props;

    backgroundColorHelper();

    return (
      <div>
        <Grid container justify="center" spacing={0}>
          <Header
            title={`${this.props.selectedEmployee.FirstName} ${
              this.props.selectedEmployee.LastName
              }'s career day`}
          />
          <Grid item xs={5} lg={4} xl={3}>
            <Grid container justify="flex-end" className={classes.navigation}>
              <Grid item>
                <Grid container spacing={8}>
                  <Grid item>
                    <Button
                      raised
                      color="primary"
                      onClick={() => this.togglePopupState()}
                    >
                      Add objective
                    </Button>
                  </Grid>

                  {this.state.isOpen && (
                    <EditObjectivePopup
                      handleClosePopup={() => this.togglePopupState()}
                      handleAddObjective={(objective: IObjectiveById) => this.handleAddObjective(objective)}
                      open={this.state.isOpen}
                    />
                  )}

                  <Grid item>
                    <Button raised color="primary">
                      Archive
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container justify="center">
              <div className={classes.root}>
                {this.props.selectedCareerDay &&
                this.props.selectedCareerDay.Objectives &&
                this.renderObjectives(classes)}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(EmployeeCareerDayPage);
