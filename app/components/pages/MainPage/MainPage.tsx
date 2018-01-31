import * as React from 'react';
import Button from 'material-ui/Button';

interface IProps {};
interface IState {};

class MainPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  state: IState = {};

  render() {
    return (
      <div>
        <h1>Main Page</h1>
      </div>
    );
  }
}

export default MainPage;
