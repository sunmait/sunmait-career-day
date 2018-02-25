import * as React from 'react';
import Typography from 'material-ui/Typography';

interface IProps {
  title: string;
}

const Header = (props: IProps) => {
  return (
    <Typography type="display2" align="center" style={{ marginBottom: 10 }}>
      {props.title}
    </Typography>
  );
};

export default Header;
