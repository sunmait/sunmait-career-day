import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withStyles, WithStyles } from '@material-ui/core/styles';

const styles = {
  button: {
    margin: '20px',
    width: '140px',
  },
};

interface IProps extends WithStyles<typeof styles> {
  title: string;
  description: string;
  confirmTitle: string;
  handleClosePopup: () => void;
  handleConfirm: () => void;
  open: boolean;
}

interface IState {}

class ConfirmationPopup extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private handleClosePopup() {
    this.props.handleClosePopup();
  }

  private handleConfirm() {
    this.props.handleConfirm();
  }

  public render() {
    const { classes } = this.props;
    return (
      <Dialog
        open={this.props.open}
        onClose={() => this.handleClosePopup()}
        style={{ textAlign: 'center' }}
      >
        <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.props.description}
          </DialogContentText>
          <Button
            className={classes.button}
            color="default"
            onClick={() => this.handleClosePopup()}
          >
            Cancel
          </Button>
          <Button color="secondary" onClick={() => this.handleConfirm()}>
            {this.props.confirmTitle}
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ConfirmationPopup);
