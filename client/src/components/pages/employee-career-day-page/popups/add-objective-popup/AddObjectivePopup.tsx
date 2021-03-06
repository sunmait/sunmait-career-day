import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FormInput from '../../../../common/form-input';
import { StylesProps } from './StylesContainer';
import { IObjectiveById } from '../../../../../redux/modules/employees/reducer';
import DialogActions from '@material-ui/core/DialogActions';

interface IProps extends StylesProps {
  handleClosePopup: () => void;
  open: boolean;
  handleAddObjective: (
    objective: Pick<IObjectiveById, 'Title' | 'Description'>,
  ) => void;
}

interface IState {
  Title: string;
  Description: string;
}

type stateKeys = keyof IState;

class ObjectivePopup extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      Title: '',
      Description: '',
    };
  }

  private addObjectiveClick = () => {
    const objective = {
      Title: this.state.Title,
      Description: this.state.Description,
    };

    this.props.handleAddObjective(objective);
    this.handleClosePopup();
  }

  private handleClosePopup = () => {
    this.props.handleClosePopup();
  }

  private handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const propName = e.target.name as stateKeys;
    const newState = { [propName]: e.target.value } as Pick<IState, stateKeys>;
    this.setState(newState);
  }

  public render() {
    const { classes } = this.props;

    return (
      <Dialog open={this.props.open} onClose={this.handleClosePopup}>
        <DialogTitle id="alert-dialog-title">Add objective</DialogTitle>
        <DialogContent className={classes.alignColumn}>
          <FormInput
            label={'Title'}
            maxLength={50}
            value={this.state.Title}
            handleChangeValue={this.handleChangeValue}
          />

          <FormInput
            label={'Description'}
            maxLength={255}
            value={this.state.Description}
            handleChangeValue={this.handleChangeValue}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            className={classes.button}
            disabled={
              this.state.Title.length === 0 ||
              this.state.Description.length === 0
            }
            onClick={this.addObjectiveClick}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ObjectivePopup;
