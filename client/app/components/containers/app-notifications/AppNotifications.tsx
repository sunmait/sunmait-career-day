import * as React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { ConnectProps } from './ConnectContainer';

interface IProps extends ConnectProps {
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

  private handleClose(e: React.SyntheticEvent<HTMLElement>, reason: string) {
    if (reason !== 'clickaway') {
      if (e) {
        e.preventDefault();
      }

      this.setState({ isOpen: false });
      this.props.deleteNotification();
    }
  }

  private handleCloseButton(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();

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
        onClose={(e: React.SyntheticEvent<HTMLElement>, reason: string) => this.handleClose(e, reason)}
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
            onClick={(e: React.MouseEvent<HTMLElement>) => this.handleCloseButton(e)}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    );
  }
}
