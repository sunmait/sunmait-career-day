import * as React from 'react';
import { withStyles, Theme } from 'material-ui/styles';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const styles = (theme: Theme) => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },
  alignColumn: {
    display: 'flex',
    flexDirection: 'column',
  } as React.CSSProperties,
});

interface IStyleProps {
  textField: string;
  alignColumn: string;
}

interface IProps {
  handleClosePopup: () => void;
  open: boolean;
  handleAddObjective: (objective: { Title: string, Description: string }) => void;
  classes: IStyleProps;
}

interface IState {
  title: string;
  description: string;
}

class ObjectivePopup extends React.Component<IProps, IState> {
  constructor(props: IProps) {
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
          <TextField
            id="multiline-flexible"
            label="Title"
            multiline
            rowsMax="4"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChangeTitleValue(e)}
            className={classes.textField}
            margin="normal"
          />

          <TextField
            id="multiline-flexible"
            label="Description"
            multiline
            rowsMax="4"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChangeDescriptionValue(e)}
            className={classes.textField}
            margin="normal"
          />

          <Button color="primary" onClick={this.addObjectiveClick}>
            Add
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ObjectivePopup);
