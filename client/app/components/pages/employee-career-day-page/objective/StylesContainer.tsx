import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    marginLeft: 10,
  },
  summary: {
    display: 'flex',
    alignItems: 'center',
    flex: '1 0 0',
  },
  alignFrom: {
    display: 'flex',
    flexDirection: 'column' as React.CSSProperties['flexDirection'],
    width: '100%',
  },
  paddingObjective: {
    paddingRight: '0px !important',
  },
});

export type StylesProps = WithStyles<typeof styles>;

export default withStyles(styles);
