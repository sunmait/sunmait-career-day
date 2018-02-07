import * as React from 'react';
import Typography from 'material-ui/Typography';

const Header = (title: string) => {
  return (
    <Typography type="display2" align="center" style={{marginBottom: 10}}>{title}</Typography>
  );
};

export default Header;
