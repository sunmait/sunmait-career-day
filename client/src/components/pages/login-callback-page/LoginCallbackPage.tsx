import React from 'react';
import { CallbackComponent } from 'redux-oidc';
import { RouteComponentProps } from 'react-router-dom';
import userManager from '../../../utils/oidcUserManager';
import Loader from '../../common/loader';

interface IProps extends RouteComponentProps {}

interface IState {}

class LoginCallbackPage extends React.Component<IProps, IState> {
  private successCallback = () => {
    this.props.history.push('/main');
  }

  private errorCallback = (error: Error) => {
    console.error(
      `There was an error handling the token callback: ${error.message}`,
    );
  }

  public render() {
    return (
      <CallbackComponent
        userManager={userManager}
        successCallback={this.successCallback}
        errorCallback={this.errorCallback}
        route="/main"
      >
        <Loader />
      </CallbackComponent>
    );
  }
}

export default LoginCallbackPage;
