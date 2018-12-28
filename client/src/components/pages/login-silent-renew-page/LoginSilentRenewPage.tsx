import * as React from 'react';
import Loader from '../../common/loader';
import { processSilentRenew } from 'redux-oidc';

interface IProps {}

interface IState {}

class LoginSilentRenewPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public componentDidMount() {
    processSilentRenew();
  }

  public render() {
    return <Loader />;
  }
}

export default LoginSilentRenewPage;
