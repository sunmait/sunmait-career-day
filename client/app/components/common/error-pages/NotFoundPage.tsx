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

const NotFoundPage = (props: IProps) => {
  return (
    <Grid container justify="center" direction="column" spacing={0}>
      <div className={props.classes.textAlign}>
        <Typography type="display4">404</Typography><br />
        <Typography type="display3">Whoops... Page Not Found !!!</Typography><br />
        <Typography type="subheading">We're sorry, but the page you are looking for doesn't exist.</Typography>
      </div>
    </Grid>
  );
};

export default withStyles(styles)(NotFoundPage);
