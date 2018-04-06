import * as React from 'react';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

interface IProps {
  title: string;
}

const Header = (props: IProps) => {
  return (
    <Grid item xs={12}>
      <Typography type="display1" align="center" style={{ marginBottom: 10 }}>
        {props.title}
      </Typography>
    </Grid>
  );
};

export default Header;
