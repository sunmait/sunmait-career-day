import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

interface IProps {
  title: string;
}

const Header = (props: IProps) => {
  return (
    <Grid item xs={12}>
      <Typography variant="h4" align="center" style={{ marginBottom: 10 }}>
        {props.title}
      </Typography>
    </Grid>
  );
};

export default Header;
