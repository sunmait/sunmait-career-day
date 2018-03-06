import * as React from 'react';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Edit from 'material-ui-icons/Edit';
import Delete from 'material-ui-icons/Delete';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import IconStatus from 'components/common/icon-status/icon-status-objective';
import FromInput from 'components/common/form-input';
import Button from 'material-ui/Button';

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
  }as React.CSSProperties,
});

type ComponentClassNames = 'heading' | 'summary' | 'alignIcons' | 'alignFrom';

interface IProps {
  objectiveId: number;
  title: string;
  description: string;
  statusId: number;
  handleSaveObjective: (objective: { title: string, description: string }) => void;
  handleDeleteObjective: (e: React.MouseEvent<SVGSVGElement>, objectiveId: number) => void;
}

interface IState {
  isEdited: boolean;
  title: string;
  description: string;
}

class Objective extends React.Component<IProps & WithStyles<ComponentClassNames>, IState> {
  constructor(props: IProps & WithStyles<ComponentClassNames>) {
    super(props);
    this.state = {
      isEdited: false,
      title: this.props.title,
      description: this.props.description,
    };
  }

  private handleEditObjective(e: React.MouseEvent<SVGSVGElement>) {
    e.preventDefault();

    this.setState({ isEdited: !this.state.isEdited });
  }

  private handleDeleteObjective(e: React.MouseEvent<SVGSVGElement>) {
    e.preventDefault();

    this.props.handleDeleteObjective(e, this.props.objectiveId);
  }

  private handleChangeTitleValue(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ title: e.target.value });
  }

  private handleChangeDescriptionValue(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ description: e.target.value });
  }

  private saveObjectiveClick() {
    const objective = {
      title: this.state.title,
      description: this.state.description,
      id: this.props.objectiveId,
    };

    this.setState({ isEdited: false });

    this.props.handleSaveObjective(objective);
  }

  private formInputPanel() {
    return (
      <ExpansionPanel expanded>
        <ExpansionPanelSummary>
          <div className={this.props.classes.alignFrom}>
            <FromInput
              label={'Title'}
              maxLength={50}
              value={this.state.title}
              handleChangeValue={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChangeTitleValue(e)}
            />

            <FromInput
              label={'Description'}
              maxLength={255}
              value={this.state.description}
              handleChangeValue={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChangeDescriptionValue(e)}
            />

            <Button
              color="primary"
              disabled={this.state.title.length === 0 || this.state.description.length === 0}
              onClick={() => this.saveObjectiveClick()}
            >
              Save
            </Button>
          </div>
        </ExpansionPanelSummary>
      </ExpansionPanel>
    );
  }

  private objectivePanel() {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <div className={this.props.classes.summary}>
            <IconStatus statusId={this.props.statusId} />
            <Typography className={this.props.classes.heading}>{this.props.title}</Typography>
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
          <Typography>{this.props.description}</Typography>
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
