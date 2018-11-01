import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap' as React.CSSProperties['flexWrap'],
    justifyContent: 'center',
    padding: '5px 0',
  },
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 350,
    margin: theme.spacing.unit,
  },
  errorMessage: {
    color: 'red',
  },
  underline: {
    textDecoration: 'none',
  },
  blueColor: {
    color: '#5a87cb',
  },
});

export type StylesProps = WithStyles<typeof styles>;

export default withStyles(styles);
