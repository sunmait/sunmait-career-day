import * as React from 'react';
import {Theme, withStyles} from 'material-ui/styles';
import Header from 'components/common/Header';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Edit from 'material-ui-icons/Edit';
import Delete from 'material-ui-icons/Delete';
import ExpansionPanel, {ExpansionPanelSummary, ExpansionPanelDetails} from 'material-ui/ExpansionPanel';
import * as employeesAction from 'redux/modules/employees/employeesAction';
import {IUser} from 'redux/modules/auth/authReducer';
import {IObjectives} from 'redux/modules/employees/employeesReducer';
import IconStatus from 'components/common/IconStatus';
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

interface IEmployeeCareerDayProps {
  classes: IStylesProps;
  tooltip: JSX.Element;
  getObjectives: employeesAction.GetObjectives;
  user: IUser;
  objectives: IObjectives[];
  employeeFullName: string;
}

interface IEmployeeCareerDayState {
}

class EmployeeCareerDayPage extends React.Component<IEmployeeCareerDayProps, IEmployeeCareerDayState> {
  constructor(props: IEmployeeCareerDayProps) {
    super(props);
  }

  public componentWillMount() {
    this.props.getObjectives();
  }

  public renderObjectives = (classes: IStylesProps) => {
    return (
      this.props.objectives.map(item => (
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
      ))
    );
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
                    <Button
                      raised
                      color="primary"
                    >
                      Add objective
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      raised
                      color="primary"
                    >
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
