import * as React from 'react';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Typography from 'material-ui/Typography';
import { INotification } from 'redux/modules/app/reducer';
import { DeleteNotification } from 'redux/modules/app/actions';

interface IProps {
  notification: INotification;
  deleteNotification: DeleteNotification;
}

interface IState {
  isOpen: boolean;
}

export default class AppNotifications extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }
  public componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.notification) {
      this.setState({
        isOpen: true,
      });
    }
  }

  private handleClose(event: React.SyntheticEvent<HTMLElement>, reason: string) {
    if (reason !== 'clickaway') {
      if (event) {
        event.preventDefault();
      }

      this.setState({ isOpen: false });
      this.props.deleteNotification();
    }
  }

  private handleCloseButton(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();

    this.setState({ isOpen: false });
    this.props.deleteNotification();
  }

  public render() {
    if (!this.props.notification) {
      return null;
    }
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.isOpen}
        autoHideDuration={5000}
        onClose={this.handleClose}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={
          <Typography color="inherit">
            {`${this.props.notification.status}: ${this.props.notification.message}`}
          </Typography>
        }
        action={
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.handleCloseButton}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    );
  }
}
