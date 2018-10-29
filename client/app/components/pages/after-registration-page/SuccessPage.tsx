import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { StylesProps } from './StylesContainer';

interface IProps extends StylesProps {}

interface IState {}

class SuccessPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.alignText}>
        <Typography variant="h4" color="inherit">
          Your registration was successful
        </Typography>
        <Typography variant="subtitle1">
          Message with instruction was sent on your email.
        </Typography>
      </div>
    );
  }
}

export default SuccessPage;
