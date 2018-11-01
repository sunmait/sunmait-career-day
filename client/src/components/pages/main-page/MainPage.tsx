import * as React from 'react';
import Header from '../../common/header';

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
        <Header title="Main Page" />
      </div>
    );
  }
}

export default MainPage;
