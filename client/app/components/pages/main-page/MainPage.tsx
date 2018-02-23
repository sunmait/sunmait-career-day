import * as React from 'react';
import Grid from 'material-ui/Grid';
import Header from 'components/common/header';

interface IProps {}

interface IState {}

class MainPage extends React.Component<IProps, IState> {
  public readonly state: IState = {};

  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <div>
        <Grid item xs={12}>
          <Header title="Main Page" />
        </Grid>
      </div>
    );
  }
}

export default MainPage;
