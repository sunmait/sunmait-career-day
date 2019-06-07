import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: 20,
    marginBottom: 20,
  },
  disableLinkStyle: {
    textDecoration: 'none',
    color: 'black',
    outline: 'none',
  },
});

export type StylesProps = WithStyles<typeof styles>;

export const StylesContainer = withStyles(styles);
