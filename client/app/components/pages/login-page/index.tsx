import { connect } from 'react-redux';
import * as redux from 'redux';
import LoginPage from './LoginPage';
import * as authActions from 'redux/modules/auth/actions';
import { Dispatch } from 'redux/store';

const mapDispatchToProps = (dispatch: Dispatch) =>
  redux.bindActionCreators(
    {
      loginAsEmployee: authActions.loginAsEmployee,
      loginAsUnitManager: authActions.loginAsUnitManager,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(LoginPage);
