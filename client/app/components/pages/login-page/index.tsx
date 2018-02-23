import { connect } from 'react-redux';
import * as redux from 'redux';
import LoginPage from './LoginPage';
import { loginAsEmployee, loginAsUnitManager } from 'redux/modules/auth/actions';
import { Dispatch } from 'redux/store';

const mapDispatchToProps = (dispatch: Dispatch) =>
  redux.bindActionCreators(
    {
      loginAsEmployee,
      loginAsUnitManager,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(LoginPage);
