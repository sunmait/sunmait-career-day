import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: 20,
    marginBottom: 20,
  },
  navigation: {
    marginTop: 20,
  },
  options: {
    margin: 10,
  },
  disableLinkStyle: {
    textDecoration: 'none',
    color: 'black',
    outline: 'none',
    display: 'inline-table',
    height: 48,
    width: '100%',
  },
  linkTextStyle: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
});

export type StylesProps = WithStyles<typeof styles>;

export default withStyles(styles);
