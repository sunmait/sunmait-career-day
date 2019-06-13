import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: 20,
    marginBottom: 20,
  },
  checkbox: {
    width: '100%',
    marginBottom: -20,
    marginLeft: 5,
  },
  disableLinkStyle: {
    textDecoration: 'none',
    color: 'black',
    outline: 'none',
  },
});

export type StylesProps = WithStyles<typeof styles>;

export default withStyles(styles);
