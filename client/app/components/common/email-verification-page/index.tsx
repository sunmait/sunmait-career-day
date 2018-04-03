import * as React from 'react';
import { Link } from 'react-router-dom';
import { Location } from 'history';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import * as  queryString from 'query-string';
import { VERIFY_MESSAGE } from './verifyMessageConstant';

const styles = () => ({
  text: {
    textAlign: 'center',
  },
  underline: {
    textDecoration: 'none',
  },
  hover: {
    '&:hover': {
      color: 'blue',
    },
  },
});

interface IStylesProps {
  text: string;
  underline: string ;
  hover: string;
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
      <div className={classes.text}>
        <Typography type="display1" color="inherit">
          {this.parseQueryParams()}
        </Typography>
        <Link to="/login" className={classes.underline}>
          <Typography type="subheading" className={classes.hover}>Return to login page</Typography>
        </Link>
      </div>
    );
  }
}

export default withStyles(styles)(EmailVerificationPage);
