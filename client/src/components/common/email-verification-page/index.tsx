import * as React from 'react';
import { Link } from 'react-router-dom';
import { Location } from 'history';
import Typography from '@material-ui/core/Typography';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import * as queryString from 'query-string';
import { VERIFY_MESSAGE } from './verifyMessageConstant';

const styles = () => ({
  text: {
    textAlign: 'center' as React.CSSProperties['textAlign'],
  },
  underline: {
    textDecoration: 'none',
  },
  hover: {
    '&:hover': {
      color: '#5a87cb',
    },
  },
});

interface IProps extends WithStyles<typeof styles> {
  location: Location;
}

interface IState {}

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
        <Typography variant="h4" color="inherit">
          {this.parseQueryParams()}
        </Typography>
        <Link to="/login" className={classes.underline}>
          <Typography variant="subtitle1" className={classes.hover}>
            Return to login page
          </Typography>
        </Link>
      </div>
    );
  }
}

export default withStyles(styles)(EmailVerificationPage);
