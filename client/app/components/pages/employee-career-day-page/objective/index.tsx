import * as React from 'react';
import * as moment from 'moment';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Edit from 'material-ui-icons/Edit';
import Delete from 'material-ui-icons/Delete';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import { LinearProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import IconStatus from 'components/common/icon-status/icon-status-objective';
import FormInput from 'components/common/form-input';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import { IObjective } from 'redux/modules/employees/reducer';

const styles = (theme: Theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    marginLeft: 10,
  },
  summary: {
    display: 'flex',
    alignItems: 'center',
    flex: '1 0 0',
  } as React.CSSProperties,
  alignFrom: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  } as React.CSSProperties,
  paddingObjective: {
    paddingRight: '0px !important',
  },
});

type ComponentClassNames = 'heading' | 'summary' | 'alignFrom' | 'paddingObjective';

interface IProps {
  objective: IObjective;
  userRole: string;
  archived?: boolean;
  handleSaveObjective?: (objective: { title?: string, description?: string, progress?: number, id: number }) => void;
  handleDeleteObjective?: (e: React.MouseEvent<HTMLElement>, objectiveId: number) => void;
}

interface IState {
  isEdited: boolean;
  Title: string;
  Description: string;
  Progress: number;
}

type stateKeys = keyof IState;

class Objective extends React.Component<IProps & WithStyles<ComponentClassNames>, IState> {
  constructor(props: IProps & WithStyles<ComponentClassNames>) {
    super(props);
    this.state = {
      isEdited: false,
      Title: this.props.objective.Title,
      Description: this.props.objective.Description,
      Progress: Math.floor(this.props.objective.Progress * 100),
    };
  }

  private handleEditObjective(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();

    this.setState({ isEdited: !this.state.isEdited });
  }

  private handleDeleteObjective(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();

    this.props.handleDeleteObjective(e, this.props.objective.id);
  }

  private handleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    const propName = e.target.name as stateKeys;
    const newState = { [propName as any]: e.target.value };
    this.setState(newState);
  }

  private saveObjectiveClick() {
    let objective;
    if (this.props.userRole === 'manager') {
      objective = {
        title: this.state.Title,
        description: this.state.Description,
        id: this.props.objective.id,
      };
    } else {
      objective = {
        progress: Number(this.state.Progress) / 100,
        id: this.props.objective.id,
      };
    }
    this.props.handleSaveObjective(objective);

    this.setState({ isEdited: false });
  }

  private setNumberProgress() {
    const progress = this.state.Progress;

    if (progress <= 100 && progress >= 0) {
      if (Number.isInteger(parseFloat(`${progress}`))) {
        return progress;
      }
    }
    return '';
  }

  private formInputPanel() {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <div className={this.props.classes.alignFrom}>
            {this.props.userRole === 'manager' ?
              [
                <FormInput
                  key={1}
                  label={'Title'}
                  maxLength={50}
                  value={this.state.Title}
                  handleChangeValue={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChangeValue(e)}
                />,
                <FormInput
                  key={2}
                  label={'Description'}
                  maxLength={255}
                  value={this.state.Description}
                  handleChangeValue={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChangeValue(e)}
                />,
              ] :
              <FormInput
                label={'Progress'}
                maxLength={3}
                value={this.setNumberProgress()}
                handleChangeValue={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChangeValue(e)}
              />
            }
            <Button
              color="primary"
              disabled={
                this.state.Title.length === 0 ||
                this.state.Description.length === 0 ||
                this.state.Progress.toString().length === 0
              }
              onClick={() => this.saveObjectiveClick()}
            >
              Save
            </Button>
          </div>
        </ExpansionPanelSummary>
      </ExpansionPanel>
    );
  }

  private objectivePanelDetails() {
    const format = 'DD.MM.YYYY';

    return (
      <Grid container justify="center" alignItems="center" spacing={8}>
        <Grid item xs={6}>
          <Typography color="textSecondary">
            {`Created at: ${moment(this.props.objective.CreatedAt).format(format)}`}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography color="textSecondary" align="right">
            {`Updated at: ${moment(this.props.objective.UpdatedAt).format(format)}`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <LinearProgress color="primary" value={this.props.objective.Progress * 100} mode="determinate" />
        </Grid>
        <Grid item xs={12}>
          <Typography color="textSecondary" align="right">
            {`Progress: ${Number(this.state.Progress)}/100`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="justify">{this.props.objective.Description}</Typography>
        </Grid>
      </Grid>
    );
  }

  private renderObjectiveOptions() {
    return (
      <React.Fragment>
        <IconButton
          onClick={(e: React.MouseEvent<HTMLElement>) => this.handleEditObjective(e)}
        >
          <Edit />
        </IconButton>
        {this.props.userRole === 'manager' ?
          <IconButton
            onClick={(e: React.MouseEvent<HTMLElement>) => this.handleDeleteObjective(e)}
          >
            <Delete />
          </IconButton>
          : null}
      </React.Fragment>
    );
  }

  private renderObjectivePanel() {
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
    return (
      <div>{this.state.isEdited ? this.formInputPanel() : this.renderObjectivePanel()}</div>
    );
  }
}

export default withStyles<ComponentClassNames>(styles)(Objective);
