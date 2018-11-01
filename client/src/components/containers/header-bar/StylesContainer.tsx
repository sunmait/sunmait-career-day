import { WithStyles, withStyles } from '@material-ui/core/styles';

const styles = {
  hover: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#EBEBEB',
    },
    display: 'flex',
    alignItems: 'center',
    padding: 15,
  },
  menuDown: {
    marginTop: 50,
  },
};

export type StylesProps = WithStyles<typeof styles>;

export default withStyles(styles);
