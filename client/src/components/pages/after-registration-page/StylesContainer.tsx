import { withStyles, WithStyles } from '@material-ui/core/styles';

const styles = () => ({
  text: {
    fontSize: 30,
  },
  alignText: {
    textAlign: 'center' as React.CSSProperties['textAlign'],
  },
});

export type StylesProps = WithStyles<typeof styles>;

export default withStyles(styles);
