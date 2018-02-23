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
} from 'redux/modules/employees/reducer';
import { GetSelectedCareerDay } from 'redux/modules/employees/action';
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
  user: IUser;
  selectedCareerDay: ICareerDayOfEmployee;
  selectedEmployee: IEmployee;
  getSelectedCareerDay: GetSelectedCareerDay;
  match: match<IMatchParams>;
}

interface IState {}

class EmployeeCareerDayPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  public componentWillMount() {
    this.props.getSelectedCareerDay(this.props.match.params.careerDayId);
  }

  public renderObjectives = (classes: IStylesProps) => {
    return this.props.selectedCareerDay.Objectives.map(item => (
      <ExpansionPanel key={item.id}>
        <ExpansionPanelSummary>
          <div className={classes.summary}>
            <IconStatus isArchived={false} />
            <Typography className={classes.heading}>{item.Title}</Typography>
          </div>

          <div style={{ padding: 0 }}>
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
    const { classes } = this.props;

    backgroundColorHelper();

    return (
      <div>
        <Grid container justify="center" spacing={0}>
        <Header
              title={`${this.props.selectedEmployee.FirstName} ${
                this.props.selectedEmployee.LastName
              }'s career day`}
            />
          <Grid item xs={5}>
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
