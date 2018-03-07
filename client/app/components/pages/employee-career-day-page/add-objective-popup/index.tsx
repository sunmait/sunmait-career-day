import * as React from 'react';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import FormInput from 'components/common/form-input';
import { withStyles, WithStyles } from 'material-ui/styles';

const styles = {
  alignColumn: {
    display: 'flex',
    flexDirection: 'column',
  } as React.CSSProperties,
};

type ComponentClassNames = 'alignColumn';

interface IProps {
  handleClosePopup: () => void;
  open: boolean;
  handleAddObjective: (objective: { Title: string, Description: string }) => void;
}

interface IState {
  Title: string;
  Description: string;
}

type stateKeys = keyof IState;

class ObjectivePopup extends React.Component<IProps & WithStyles<ComponentClassNames>, IState> {
  constructor(props: IProps & WithStyles<ComponentClassNames>) {
    super(props);
    this.state = {
      Title: '',
      Description: '',
    };
  }

  private addObjectiveClick() {
    const objective = {
      Title: this.state.Title,
      Description: this.state.Description,
    };

    this.props.handleAddObjective(objective);
    this.handleClosePopup();
  }

  private handleClosePopup() {
    this.props.handleClosePopup();
  }

  private handleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    const propName = e.target.name as stateKeys;
    const newState = { [propName as any]: e.target.value };
    this.setState(newState);
  }

  public render() {
    const { classes } = this.props;

    return (
      <Dialog open={this.props.open} onClose={() => this.handleClosePopup()}>
        <DialogTitle id="alert-dialog-title">Add objective</DialogTitle>
        <DialogContent className={classes.alignColumn}>
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

          <Button
            color="primary"
            disabled={this.state.Title.length === 0 || this.state.Description.length === 0}
            onClick={() => this.addObjectiveClick()}
          >
            Add
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles<ComponentClassNames>(styles)(ObjectivePopup);
