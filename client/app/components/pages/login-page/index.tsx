import { connect } from 'react-redux';
import * as redux from 'redux';
import { IStore } from 'redux/rootReducer';
import LoginPage from './LoginPage';
import { login } from 'redux/modules/auth/actions';
import { Dispatch } from 'redux/store';

const mapStateToProps = (state: IStore) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => redux.bindActionCreators({
  login,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
