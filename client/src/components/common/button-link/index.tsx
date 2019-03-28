import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

interface IProps {
  primary?: string;
  secondary?: string;
  to: string;
  isDisabled: boolean;
  classes: Record<"root" | "disableLinkStyle", string>
  state?: any
}

const ButtonLink = (props: IProps) => {
  const { classes,
    to,
    primary,
    secondary,
    state,
    isDisabled } = props;

  return (
    <Link
      to={{
        pathname: `${to}`,
        state: state
      }}
      className={classes.disableLinkStyle}
    >
      {isDisabled ?
        <ListItem button divider disabled >
          <ListItemText
            primary={primary}
            secondary={secondary}
          />
        </ListItem>
        :
        <ListItem button divider >
          <ListItemText
            primary={primary}
            secondary={secondary}
          />
        </ListItem>
      }

    </Link>
  );
};

export default ButtonLink;