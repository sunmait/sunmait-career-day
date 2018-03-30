import * as React from 'react';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = {
  textAlign: {
    textAlign: 'center',
  },
};

interface IStyleProps {
  textAlign: string;
}

interface IProps {
  classes: IStyleProps;
}

const InternalServerErrorPage = (props: IProps) => {
  return (
    <Grid container justify="center" direction="column" spacing={0}>
      <div className={props.classes.textAlign}>
        <Typography type="display4">500</Typography><br />
        <Typography type="display3">Internal Server Error</Typography><br />
        <Typography type="subheading">We're working towards creating something better. We won't be long</Typography>
      </div>
    </Grid>
  );
};

export default withStyles(styles)(InternalServerErrorPage);
