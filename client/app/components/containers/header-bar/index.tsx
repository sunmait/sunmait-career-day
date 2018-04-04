import { connect } from 'react-redux';
import { IStore } from 'redux/rootReducer';
import HeaderBar from './HeaderBar';
import { logout } from 'redux/modules/auth/actions';
import { Dispatch } from 'redux/store';
import * as redux from 'redux';

const mapStateToProps = (state: IStore) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => redux.bindActionCreators({
  logout,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar);
