import * as React from 'react';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { Location } from 'history';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import * as  queryString from 'query-string';
import { VERIFY_MESSAGE } from './verifyMessageConstant';

const styles = () => ({
  text: {
    fontSize: 30,
    textAlign: 'center',
  },
  underline: {
    textDecoration: 'none',
  },
});

interface IStylesProps {
  text: string;
  underline: string;
}

interface IProps {
  classes: IStylesProps;
  location: Location;
}

interface IState {
}

class EmailVerificationPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  private parseQueryParams() {
    const status = queryString.parse(this.props.location.search).successful;

    if (status === 'true') {
      return VERIFY_MESSAGE.VALID;
    }
    return VERIFY_MESSAGE.NOT_VALID;
  }

  public render() {
    const { classes } = this.props;

    return (
      <Paper>
        <Typography className={classes.text}>
          {this.parseQueryParams()}
          <Link to="/login" className={classes.underline}>
            <Button color="primary">Sign in</Button>
          </Link>
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(EmailVerificationPage);
