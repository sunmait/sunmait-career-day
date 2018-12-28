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
import FormInput from '../../../common/form-input';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {
  IObjective,
  IUpdateObjectiveEmployee,
  IUpdateObjectiveManager,
} from '../../../../redux/modules/employees/reducer';
import { StylesProps } from './StylesContainer';
import { ROLES } from '../../../../redux/modules/oidc/constants';

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
  Title: string;
  Description: string;
  Progress: number;
}

type stateKeys = keyof IState;

class Objective extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isEdited: false,
      Title: this.props.objective.Title,
      Description: this.props.objective.Description,
      Progress: Math.floor(this.props.objective.Progress * 100),
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

  private handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const propName = e.target.name as stateKeys;
    const newState = { [propName as any]: e.target.value } as Pick<
      IState,
      stateKeys
    >;
    this.setState(newState);
  }

  private saveObjectiveClick = () => {
    const { handleSaveObjective, userRole, objective } = this.props;
    if (userRole === ROLES.UNIT_MANAGER) {
      handleSaveObjective({
        title: this.state.Title,
        description: this.state.Description,
        id: objective.id,
      });
    } else {
      handleSaveObjective({
        progress: Number(this.state.Progress) / 100,
        id: objective.id,
      });
    }

    this.setState({ isEdited: false });
  }

  private setNumberProgress = () => {
    const progress = this.state.Progress;

    if (progress <= 100 && progress >= 0) {
      if (Number.isInteger(parseFloat(`${progress}`))) {
        return progress;
      }
    }
    return '';
  }

  private formInputPanel = () => {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <div className={this.props.classes.alignFrom}>
            {this.props.userRole === 'manager' ? (
              [
                <FormInput
                  key={1}
                  label={'Title'}
                  maxLength={50}
                  value={this.state.Title}
                  handleChangeValue={this.handleChangeValue}
                />,
                <FormInput
                  key={2}
                  label={'Description'}
                  maxLength={255}
                  value={this.state.Description}
                  handleChangeValue={this.handleChangeValue}
                />,
              ]
            ) : (
              <FormInput
                label={'Progress'}
                maxLength={3}
                value={this.setNumberProgress()}
                handleChangeValue={this.handleChangeValue}
              />
            )}
            <Button
              color="primary"
              disabled={
                this.state.Title.length === 0 ||
                this.state.Description.length === 0 ||
                this.state.Progress.toString().length === 0
              }
              onClick={this.saveObjectiveClick}
            >
              Save
            </Button>
          </div>
        </ExpansionPanelSummary>
      </ExpansionPanel>
    );
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
            {`Progress: ${Number(this.state.Progress)}/100`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="justify">
            {this.props.objective.Description}
          </Typography>
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
        {this.props.userRole === 'manager' ? (
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
