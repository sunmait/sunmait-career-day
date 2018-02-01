import * as React from 'react';

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
        <h1>Main Page</h1>
      </div>
    );
  }
}

export default MainPage;
