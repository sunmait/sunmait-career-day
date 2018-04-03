import { connect } from 'react-redux';
import * as redux from 'redux';
import SignUpPage from './SignUpPage';
import { signUp } from 'redux/modules/auth/actions';
import { Dispatch } from 'redux/store';

const mapDispatchToProps = (dispatch: Dispatch) => redux.bindActionCreators({
  signUp,
}, dispatch);

export default connect(null, mapDispatchToProps)(SignUpPage);
