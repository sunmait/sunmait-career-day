import * as React from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  text: {
    fontSize: 30,
  },
});

interface IStylesProps {
  text: string;
}

interface IProps {
  classes: IStylesProps;
}

interface IState {
}

class SuccessPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const {classes} = this.props;
    return (
      <Paper>
        <Typography className={classes.text}>
          Your registration was successful
        </Typography>
        <Typography>
          Message with instruction was sent on your email.
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(SuccessPage);
