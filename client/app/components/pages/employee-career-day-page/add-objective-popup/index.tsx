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
  title: string;
  description: string;
}

class ObjectivePopup extends React.Component<IProps & WithStyles<ComponentClassNames>, IState> {
  constructor(props: IProps & WithStyles<ComponentClassNames>) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };
  }

  public addObjectiveClick = () => {
    const objective = {
      Title: this.state.title,
      Description: this.state.description,
    };

    this.props.handleAddObjective(objective);
    this.handleClosePopup();
  }

  public handleClosePopup = () => {
    this.props.handleClosePopup();
  }

  public handleChangeTitleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({title: e.target.value});
  }

  public handleChangeDescriptionValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({description: e.target.value});
  }

  public render() {
    const {classes} = this.props;

    return (
      <Dialog open={this.props.open} onClose={this.handleClosePopup}>
        <DialogTitle id="alert-dialog-title">Add objective</DialogTitle>
        <DialogContent className={classes.alignColumn}>
          <FormInput
            label={'Title'}
            maxLength={50}
            inputHelperText={'Max 50 characters'}
            calculateCharacters={`${50 - this.state.title.length}/50`}
            handleChangeValue={this.handleChangeTitleValue}
          />

          <FormInput
            label={'Description'}
            maxLength={255}
            inputHelperText={'Max 255 characters'}
            calculateCharacters={`${255 - this.state.description.length}/255`}
            handleChangeValue={this.handleChangeDescriptionValue}
          />

          <Button
            color="primary"
            disabled={this.state.title.length === 0 || this.state.description.length === 0}
            onClick={this.addObjectiveClick}
          >
            Add
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles<ComponentClassNames>(styles)(ObjectivePopup);
