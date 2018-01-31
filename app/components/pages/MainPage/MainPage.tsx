import * as React from 'react';

interface IProps {};
interface IState {};

class MainPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  state: IState = {};

  render() {
    return (
      <h1>Main Page</h1>
    );
  }
}

export default MainPage;
