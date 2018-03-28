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
import { IObjective } from 'redux/modules/employees/reducer';

const styles = (theme: Theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    marginLeft: 10,
  },
  alignIcons: {
    margin: 10,
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
  }as React.CSSProperties,
});

type ComponentClassNames = 'heading' | 'summary' | 'alignIcons' | 'alignFrom';

interface IProps {
  objective: IObjective;
  handleSaveObjective: (objective: { title: string, description: string }) => void;
  handleDeleteObjective: (e: React.MouseEvent<SVGSVGElement>, objectiveId: number) => void;
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

  private handleEditObjective(e: React.MouseEvent<SVGSVGElement>) {
    e.preventDefault();

    this.setState({ isEdited: !this.state.isEdited });
  }

  private handleDeleteObjective(e: React.MouseEvent<SVGSVGElement>) {
    e.stopPropagation();

    this.props.handleDeleteObjective(e, this.props.objective.id);
  }

  private handleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    const propName = e.target.name as stateKeys;
    const newState = { [propName as any]: e.target.value };
    this.setState(newState);
  }

  private saveObjectiveClick() {
    const objective = {
      title: this.state.Title,
      description: this.state.Description,
      progress: Number(this.state.Progress) / 100,
      id: this.props.objective.id,
    };

    this.setState({ isEdited: false });

    this.props.handleSaveObjective(objective);
  }

  private setNumberProgress() {
    const progress = this.state.Progress;

    if (!isNaN(progress)) {
      if (progress <= 100 && progress >= 0) {
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
            <FormInput
              label={'Title'}
              maxLength={50}
              value={this.state.Title}
              handleChangeValue={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChangeValue(e)}
            />
            <FormInput
              label={'Description'}
              maxLength={255}
              value={this.state.Description}
              handleChangeValue={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChangeValue(e)}
            />
            <FormInput
              label={'Progress'}
              maxLength={3}
              value={this.setNumberProgress()}
              handleChangeValue={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChangeValue(e)}
            />
            <Button
              color="primary"
              disabled={this.state.Title.length === 0 || this.state.Description.length === 0}
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
            {`Progress: ${this.state.Progress}/100`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="justify">{this.props.objective.Description}</Typography>
        </Grid>
      </Grid>
    );
  }

  private objectivePanel() {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <div className={this.props.classes.summary}>
            <IconStatus statusId={this.props.objective.StatusId} />
            <Typography className={this.props.classes.heading}>{this.props.objective.Title}</Typography>
          </div>

          <div style={{ padding: 0 }}>
            <Edit
              className={this.props.classes.alignIcons}
              onClick={(e: React.MouseEvent<SVGSVGElement>) => this.handleEditObjective(e)}
            />
            <Delete
              className={this.props.classes.alignIcons}
              onClick={(e: React.MouseEvent<SVGSVGElement>) => this.handleDeleteObjective(e)}
            />
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
      <div>{this.state.isEdited ? this.formInputPanel() : this.objectivePanel()}</div>
    );
  }
}

export default withStyles<ComponentClassNames>(styles)(Objective);
