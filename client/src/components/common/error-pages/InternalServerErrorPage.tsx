import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
  textAlign: {
    textAlign: 'center' as React.CSSProperties['textAlign'],
  },
};

interface IProps extends WithStyles<typeof styles> {
}

const InternalServerErrorPage = (props: IProps) => {
  return (
    <Grid container justify="center" direction="column" spacing={0}>
      <div className={props.classes.textAlign}>
        <Typography variant="h1">500</Typography>
        <br />
        <Typography variant="h2">Internal Server Error</Typography>
        <br />
        <Typography variant="subtitle1">
          We're working towards creating something better. We won't be long
        </Typography>
      </div>
    </Grid>
  );
};

export default withStyles(styles)(InternalServerErrorPage);
