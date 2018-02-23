import * as React from 'react';
import {match} from 'react-router-dom';
import {Theme, withStyles} from 'material-ui/styles';
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
import * as employeesAction from 'redux/modules/employees/action';
import {IUser} from 'redux/modules/auth/reducer';
import {IObjectives} from 'redux/modules/employees/reducer';
import IconStatus from 'components/common/icon-status';
import backgroundColorHelper from 'components/helper/backgroundColorHelper';

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
  getObjectives: employeesAction.GetObjectives;
  user: IUser;
  objectives: IObjectives[];
  employeeFullName: string;
  match: match<IMatchParams>;
}

interface IState {}

class EmployeeCareerDayPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  public componentWillMount() {
    this.props.getObjectives(this.props.match.params.careerDayId);
  }

  public renderObjectives = (classes: IStylesProps) => {
    return this.props.objectives.map(item => (
      <ExpansionPanel key={item.id}>
        <ExpansionPanelSummary>
          <div className={classes.summary}>
            <IconStatus isArchived={false} />
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
          <Grid item xs={5}>
            <Header title={`${this.props.employeeFullName}'s career day`} />
            <Grid container justify="flex-end" className={classes.navigation}>
              <Grid item>
                <Grid container spacing={8}>
                  <Grid item>
                    <Button raised color="primary">
                      Add objective
                    </Button>
                  </Grid>

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
                {this.props.objectives && this.renderObjectives(classes)}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(EmployeeCareerDayPage);
