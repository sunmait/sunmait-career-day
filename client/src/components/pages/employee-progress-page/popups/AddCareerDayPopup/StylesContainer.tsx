import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
  button: {
    marginTop: theme.spacing.unit,
  },
  alignColumn: {
    display: 'flex',
    flexDirection: 'column' as React.CSSProperties['flexDirection'],
  },
});

export type StylesProps = WithStyles<typeof styles>;

export default withStyles(styles);
