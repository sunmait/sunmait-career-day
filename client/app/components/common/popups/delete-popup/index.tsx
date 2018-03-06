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
  handleClosePopup: () => void;
  handleDeleteItem: () => void;
  open: boolean;
}

interface IState {
}

class DeleteCareerDayPopup extends React.Component<IProps & WithStyles<ComponentClassNames>, IState> {
  constructor(props: IProps & WithStyles<ComponentClassNames>) {
    super(props);
  }

  private handleClosePopup() {
    this.props.handleClosePopup();
  }

  private handleDeleteItem() {
    this.props.handleDeleteItem();
  }

  public render() {
    const {classes} = this.props;
    return (
      <Dialog
        open={this.props.open}
        onClose={() => this.handleClosePopup()}
        style={{textAlign: 'center'}}
      >
        <DialogTitle id="alert-dialog-title">
          Remove this career day?
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove this career day?
          </Typography>
          <Typography>
            Also, along with the career day, the objectives that belong to this
            will be removed!
          </Typography>
          <Button
            className={classes.button}
            raised
            color="secondary"
            onClick={() => this.handleDeleteItem()}
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

export default withStyles<ComponentClassNames>(styles)(DeleteCareerDayPopup);