import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
  button: {
    marginTop: theme.spacing.unit,
    padding: 15,
  },
});

export type StylesProps = WithStyles<typeof styles>;

export default withStyles(styles);
