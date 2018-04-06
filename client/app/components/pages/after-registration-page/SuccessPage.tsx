import * as React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  text: {
    fontSize: 30,
  },
  alignText: {
    textAlign: 'center',
  },
});

interface IStylesProps {
  text: string;
  alignText: string;
}

interface IProps {
  classes: IStylesProps;
}

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
        <Typography type="display1" color="inherit">
          Your registration was successful
        </Typography>
        <Typography type="subheading">Message with instruction was sent on your email.</Typography>
      </div>
    );
  }
}

export default withStyles(styles)(SuccessPage);
