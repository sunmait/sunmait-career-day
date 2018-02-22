import * as React from 'react';
import Grid from 'material-ui/Grid';
import {withStyles} from 'material-ui/styles';
import Header from 'components/common/Header';
import AppHeaderBar from 'components/common/AppHeaderBar';

const styles = () => ({
  header: {
    padding: 15,
  },
});

interface IStyleProps {  
  header: string;
}

interface IProps {
  classes: IStyleProps;
}
interface IState {}

class MainPage extends React.Component<IProps, IState> {
  public readonly state: IState = {};

  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const {classes} = this.props;
    return (
      <div>
        <Grid item xs={12} >
            <AppHeaderBar />
          </Grid>
        <Grid item md={12} className={classes.header}>
          <Header title="Main Page" />
        </Grid>

      </div>
    );
  }
}

export default withStyles(styles)(MainPage);
