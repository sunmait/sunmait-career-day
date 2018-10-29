import { withStyles, WithStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  navigation: {
    marginTop: 10,
    marginBottom: 10,
  },
  datetime: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  paper: {
    paddingTop: 10,
    paddingBottom: 10,
  },
};

export type StylesProps = WithStyles<typeof styles>;

export default withStyles(styles);
