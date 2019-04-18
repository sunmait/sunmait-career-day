import * as React from 'react';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import IconStatus from '../../../common/icon-status/icon-status-objective';
import IconButton from '@material-ui/core/IconButton';
import {
  IObjective,
  IUpdateObjectiveEmployee,
  IUpdateObjectiveManager,
  IProgressObjectve,
} from '../../../../redux/modules/employees/reducer';
import { StylesProps } from './StylesContainer';
import { ROLES } from '../../../../redux/modules/oidc/constants';
import { ListItemText, ListItem } from '@material-ui/core';
import ProgressObjectiveForEmployee from '../progress-objective-for-employee/'
import ProgressObjectiveForManager from '../progress-objective-for-manager';

interface IProps extends StylesProps {
  objective: IObjective;
  userRole: string;
  archived?: boolean;
  handleSaveObjective: (
    objective: IUpdateObjectiveEmployee | IUpdateObjectiveManager,
  ) => void;
  handleDeleteObjective?: (
    e: React.MouseEvent<HTMLElement>,
    objectiveId: number,
  ) => void;
}

interface IState {
  isEdited: boolean;
}

class Objective extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isEdited: false,
    };
  }

  private handleEditObjective = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    this.setState({ isEdited: !this.state.isEdited });
  }

  private handleDeleteObjective = (e: React.MouseEvent<HTMLElement>) => {
    const { handleDeleteObjective } = this.props;
    if (!handleDeleteObjective) {
      return;
    }

    e.stopPropagation();
    handleDeleteObjective(e, this.props.objective.id);
  }

  private formInputPanel = () => {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <div className={this.props.classes.alignFrom} >
            {this.props.userRole === ROLES.UNIT_MANAGER ? (
                <ProgressObjectiveForManager
                  classes={this.props.classes}
                  handleSaveObjective={this.props.handleSaveObjective}
                  objective={this.props.objective}
                  handleEditObjective={this.handleEditObjective}
                />
            ) : <ProgressObjectiveForEmployee
                  classes={this.props.classes}
                  objective={this.props.objective}
                  handleSaveObjective={this.props.handleSaveObjective}
                  handleEditObjective={this.handleEditObjective}
                />
            }
          </div>
        </ExpansionPanelSummary>
      </ExpansionPanel>
    );
  }

  private progressObjectivePanel = () => {
    if (this.props.objective.ProgressObjective
      && this.props.objective.ProgressObjective.length) {
      return (
        <ExpansionPanel>
          <ExpansionPanelSummary>
            Patrial progress
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={this.props.classes.details}>
              {this.props.objective.ProgressObjective.map(progress => {
                return this.renderProgressObjective(progress);
              })}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    }
  }

  private renderProgressObjective = (progress: IProgressObjectve) => {
    return (
      <ListItem divider button key={progress.id}>
        <ListItemText
          primary={progress.Progress * 100 + '%'}
          secondary={progress.Description}
        />
      </ListItem>
    )
  }

  private objectivePanelDetails = () => {
    const format = 'DD.MM.YYYY';

    return (
      <Grid container justify="center" alignItems="center" spacing={8}>
        <Grid item xs={6}>
          <Typography color="textSecondary">
            {`Created at: ${moment(this.props.objective.CreatedAt).format(
              format,
            )}`}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography color="textSecondary" align="right">
            {`Updated at: ${moment(this.props.objective.UpdatedAt).format(
              format,
            )}`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <LinearProgress
            color="primary"
            value={this.props.objective.Progress * 100}
            variant="determinate"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color="textSecondary" align="right">
            {`Progress: ${Number(this.props.objective.Progress)*100}/100`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="justify">
            {this.props.objective.Description}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {this.progressObjectivePanel()}
        </Grid>
      </Grid>
    );
  }

  private renderObjectiveOptions = () => {
    return (
      <React.Fragment>
        <IconButton onClick={this.handleEditObjective}>
          <Edit />
        </IconButton>
        {this.props.userRole === ROLES.UNIT_MANAGER ? (
          <IconButton onClick={this.handleDeleteObjective}>
            <Delete />
          </IconButton>
        ) : null}
      </React.Fragment>
    );
  }

  private renderObjectivePanel = () => {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <div className={this.props.classes.summary}>
            <IconStatus statusId={this.props.objective.StatusId} />
            <Typography className={this.props.classes.heading}>
              {this.props.objective.Title}
            </Typography>
          </div>

          <div className={this.props.classes.paddingObjective}>
            {!this.props.archived && this.renderObjectiveOptions()}
          </div>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          {this.objectivePanelDetails()}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }

  public render() {
    return this.state.isEdited
      ? this.formInputPanel()
      : this.renderObjectivePanel();
  }
}

export default Objective;
