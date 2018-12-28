import { WithStyles, withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    position: 'absolute' as React.CSSProperties['position'],
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    zIndex: 100,
  },
  progressWrapper: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export type StylesProps = WithStyles<typeof styles>;

export default withStyles(styles);
