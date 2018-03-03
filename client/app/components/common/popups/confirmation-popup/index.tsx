import * as React from 'react';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { WithStyles } from 'material-ui';

const styles = {
  button: {
    margin: '20px',
    width: '140px',
  },
};

type ComponentClassNames = 'button';

interface IProps {
  title: string;
  description: string;
  handleClosePopup: () => void;
  handleConfirm: () => void;
  open: boolean;
}

interface IState {}

class ConfirmationPopup extends React.Component<IProps & WithStyles<ComponentClassNames>, IState> {
  constructor(props: IProps & WithStyles<ComponentClassNames>) {
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
          <Typography>{this.props.description}</Typography>
          <Button
            className={classes.button}
            raised
            color="secondary"
            onClick={() => this.handleConfirm()}
          >
            Yes
          </Button>
          <Button
            className={classes.button}
            raised
            color="primary"
            onClick={() => this.handleClosePopup()}
          >
            No
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles<ComponentClassNames>(styles)(ConfirmationPopup);
