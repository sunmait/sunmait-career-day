import * as React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../../common/header';
import { isAuthAsManager, isAuthAsEmployee } from '../../helper/userRoleHelper';
import { ConnectProps } from './ConnectContainer';

interface IProps extends ConnectProps {}

interface IState {}

class MainPage extends React.Component<IProps, IState> {
  public readonly state: IState = {};

  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const { user } = this.props;

    if (user && isAuthAsManager(user)) {
      return <Redirect to="/employees" />;
    } else if (user && isAuthAsEmployee(user)) {
      return <Redirect to="/employee" />;
    }

    return (
      <div>
        <Header title="Main Page" />
      </div>
    );
  }
}

export default MainPage;
