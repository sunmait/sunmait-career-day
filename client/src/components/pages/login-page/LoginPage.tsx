import * as React from 'react';
import userManager from '../../../utils/oidcUserManager';
import Loader from '../../common/loader';
import { ConnectProps } from './ConnectContainer';

interface IProps extends ConnectProps {}

interface IState {}

class LoginPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public componentDidUpdate(prevProps: IProps) {
    if (
      prevProps.isLoadingUser === true &&
      this.props.isLoadingUser === false
    ) {
      userManager.signinRedirect();
    }
  }

  public render() {
    return <Loader />;
  }
}

export default LoginPage;
